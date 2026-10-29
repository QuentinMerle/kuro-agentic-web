import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { ShoeColor } from "../core/types.ts";

export interface ThreeViewportController {
  setColor: (color: ShoeColor) => void;
  captureSnapshotAndDispose: () => string;
  destroy: () => void;
}

export function initThreeViewport(
  container: HTMLElement,
  initialColor: ShoeColor
): Promise<ThreeViewportController> {
  return new Promise((resolve, reject) => {
    // 1. Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 2.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Attach to DOM
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x79a6ff, 1.0);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // Subtle contact shadow / floor gradient
    const shadowGeo = new THREE.PlaneGeometry(3, 3);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
    grad.addColorStop(0, "rgba(0, 0, 0, 0.7)");
    grad.addColorStop(0.5, "rgba(0, 0, 0, 0.3)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.38;
    scene.add(shadowMesh);

    // 3. Model Loader
    const loader = new GLTFLoader();
    const pivot = new THREE.Group();
    scene.add(pivot);

    let shoeMesh: THREE.Object3D | null = null;
    const colorMaterials: THREE.MeshStandardMaterial[] = [];

    // Color definitions
    const colorMap: Record<ShoeColor, number> = {
      "Obsidian Black": 0x181818,
      "Deep Indigo": 0x22355e,
      "Raw Chalk": 0xd8d4c7,
    };

    function applyColor(color: ShoeColor): void {
      const hex = colorMap[color];
      for (const mat of colorMaterials) {
        mat.color.setHex(hex);
        // If it had textures, we tint or update
        mat.roughness = color === "Raw Chalk" ? 0.75 : 0.45;
        mat.needsUpdate = true;
      }
    }

    loader.load(
      "/models/shoe.glb",
      (gltf) => {
        shoeMesh = gltf.scene;

        // Traverse to find meshes & gather materials
        shoeMesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const materials = Array.isArray(mesh.material)
                ? mesh.material
                : [mesh.material];
              for (const m of materials) {
                if (m instanceof THREE.MeshStandardMaterial) {
                  // Clone material to customize without altering gltf cache
                  const clonedMat = m.clone();
                  mesh.material = clonedMat;
                  colorMaterials.push(clonedMat);
                }
              }
            }
          }
        });

        // Compute bounding box and center
        const bbox = new THREE.Box3().setFromObject(shoeMesh);
        const center = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());

        // Center model inside pivot
        shoeMesh.position.x = -center.x;
        shoeMesh.position.y = -center.y;
        shoeMesh.position.z = -center.z;

        // Scale to fit comfortably
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 1.1 / maxDim;
        pivot.scale.setScalar(targetScale);
        pivot.position.y = 0.05;

        // Initial orientation
        pivot.rotation.y = -Math.PI / 4;
        pivot.rotation.x = 0.15;

        applyColor(initialColor);

        // Hide loader in container if present
        const loaderEl = container.querySelector(".viewport-loading");
        if (loaderEl) loaderEl.remove();

        resolve(controller);
      },
      undefined,
      (err) => {
        console.error("[ThreeViewport] Error loading shoe.glb:", err);
        reject(err);
      }
    );

    // 4. Interactive Drag & Orbital Inertia
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -Math.PI / 4;
    let targetRotationX = 0.15;
    let currentRotationY = -Math.PI / 4;
    let currentRotationX = 0.15;
    let autoRotate = true;
    let idleTimer = 0;

    const onPointerDown = (e: PointerEvent): void => {
      isDragging = true;
      autoRotate = false;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent): void => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;

      // Restrict vertical rotation
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));
    };

    const onPointerUp = (): void => {
      isDragging = false;
      container.style.cursor = "grab";
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        autoRotate = true;
      }, 3500);
    };

    container.style.cursor = "grab";
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 5. Animation loop
    let animId = 0;
    const animate = (): void => {
      animId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        targetRotationY += 0.004;
      }

      // Smooth damping (ease-out quint simulation)
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      pivot.rotation.y = currentRotationY;
      pivot.rotation.x = currentRotationX;

      renderer.render(scene, camera);
    };
    animate();

    // 6. Controller object
    const controller: ThreeViewportController = {
      setColor: (color: ShoeColor) => {
        applyColor(color);
      },

      captureSnapshotAndDispose: () => {
        // Force clean render
        renderer.render(scene, camera);
        const dataUrl = renderer.domElement.toDataURL("image/png");

        // Clean teardown & VRAM release
        cancelAnimationFrame(animId);
        resizeObserver.disconnect();
        container.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);

        scene.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const m = obj as THREE.Mesh;
            m.geometry?.dispose();
            if (Array.isArray(m.material)) {
              m.material.forEach((mat) => mat.dispose());
            } else {
              m.material?.dispose();
            }
          }
        });

        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();

        return dataUrl;
      },

      destroy: () => {
        cancelAnimationFrame(animId);
        resizeObserver.disconnect();
        container.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        renderer.dispose();
        renderer.domElement.remove();
      },
    };
  });
}
