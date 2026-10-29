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
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 1.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Style canvas to fill container underneath overlays
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "1";
    container.style.position = "relative";
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8cb8ff, 1.2);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffeedd, 1.6);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // Subtle contact shadow floor
    const shadowGeo = new THREE.PlaneGeometry(2.5, 2.5);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
    grad.addColorStop(0, "rgba(0, 0, 0, 0.65)");
    grad.addColorStop(0.5, "rgba(0, 0, 0, 0.2)");
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
    shadowMesh.position.y = -0.32;
    scene.add(shadowMesh);

    // 3. Model Loader & Pivot Container
    const loader = new GLTFLoader();
    const pivot = new THREE.Group();
    scene.add(pivot);

    let shoeMesh: THREE.Object3D | null = null;
    const colorMaterials: THREE.MeshStandardMaterial[] = [];

    // Distinct PBR color tunings matching our 3 official colorways
    const colorTunings: Record<ShoeColor, { color: number; roughness: number; metalness: number }> = {
      "Obsidian Black": { color: 0x333333, roughness: 0.35, metalness: 0.1 },
      "Deep Indigo": { color: 0x3d5a99, roughness: 0.45, metalness: 0.15 },
      "Raw Chalk": { color: 0xf5f3ee, roughness: 0.65, metalness: 0.05 },
    };

    function applyColor(color: ShoeColor): void {
      const tuning = colorTunings[color] || colorTunings["Deep Indigo"];
      for (const mat of colorMaterials) {
        mat.color.setHex(tuning.color);
        mat.roughness = tuning.roughness;
        mat.metalness = tuning.metalness;
        mat.needsUpdate = true;
      }
    }

    loader.load(
      "/models/shoe.glb",
      (gltf) => {
        shoeMesh = gltf.scene;

        // Traverse to find meshes & gather standard materials
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

        // Center model geometry inside the pivot group
        shoeMesh.position.x = -center.x;
        shoeMesh.position.y = -center.y;
        shoeMesh.position.z = -center.z;

        // Add shoeMesh into the pivot!
        pivot.add(shoeMesh);

        // Normalize scale to fit frustum comfortably
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 1.3 / (maxDim || 1);
        pivot.scale.setScalar(targetScale);
        pivot.position.set(0, 0, 0);

        // Initial orientation (slight 3/4 dynamic perspective)
        pivot.rotation.y = -Math.PI / 4;
        pivot.rotation.x = 0.18;

        applyColor(initialColor);

        // Smoothly fade out the loader overlay
        const loaderEl = container.querySelector("#three-loader") as HTMLElement | null;
        if (loaderEl) {
          loaderEl.style.transition = "opacity 0.4s var(--ease-out-quint)";
          loaderEl.style.opacity = "0";
          setTimeout(() => loaderEl.remove(), 400);
        }

        console.info("[ThreeViewport] Kuro 3D shoe loaded successfully!");
        resolve(controller);
      },
      (xhr) => {
        const percent = xhr.total ? Math.round((xhr.loaded / xhr.total) * 100) : 0;
        const loaderText = container.querySelector("#three-loader span");
        if (loaderText && percent > 0) {
          loaderText.textContent = `Loading 3D asset (${percent}%)...`;
        }
      },
      (err) => {
        console.error("[ThreeViewport] Error loading /models/shoe.glb:", err);
        const loaderText = container.querySelector("#three-loader span");
        if (loaderText) {
          loaderText.textContent = "Failed to load 3D model.";
        }
        reject(err);
      }
    );

    // 4. Interactive Drag & Orbital Inertia
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -Math.PI / 4;
    let targetRotationX = 0.18;
    let currentRotationY = -Math.PI / 4;
    let currentRotationX = 0.18;
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

      // Restrict vertical rotation range
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
        targetRotationY += 0.005;
      }

      // Smooth damping
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      pivot.rotation.y = currentRotationY;
      pivot.rotation.x = currentRotationX;

      renderer.render(scene, camera);
    };
    animate();

    // 6. Controller
    const controller: ThreeViewportController = {
      setColor: (color: ShoeColor) => {
        applyColor(color);
      },

      captureSnapshotAndDispose: () => {
        renderer.render(scene, camera);
        const dataUrl = renderer.domElement.toDataURL("image/png");

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
