import * as THREE from "three";
import { SNEAKER_GEOMETRY_B64 } from "./shoe-geometry-data.ts";

declare global {
  interface Window {
    mountRealThreeShoe: (container: HTMLElement, color: string) => {
      setColor: (colorName: string) => void;
      captureSnapshot: () => string;
      destroy: () => void;
    };
  }
}

// Decode base64 binary geometry directly in memory (zero network request)
function decodeSneakerGeometry(): THREE.BufferGeometry {
  const binaryString = atob(SNEAKER_GEOMETRY_B64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const normalData = bytes.subarray(0, 162480);
  const posData = bytes.subarray(162480, 162480 + 162480);
  const uvData = bytes.subarray(324960, 324960 + 108320);
  const idxData = bytes.subarray(433280, 433280 + 272400);

  const normals = new Float32Array(normalData.buffer, normalData.byteOffset, 13540 * 3);
  const positions = new Float32Array(posData.buffer, posData.byteOffset, 13540 * 3);
  const uvs = new Float32Array(uvData.buffer, uvData.byteOffset, 13540 * 2);
  const indices = new Uint32Array(idxData.buffer, idxData.byteOffset, 68100);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(new THREE.BufferAttribute(indices, 1));
  geo.computeVertexNormals();

  return geo;
}

window.mountRealThreeShoe = function (container: HTMLElement, initialColor: string) {
  const scene = new THREE.Scene();
  const width = container.clientWidth || 440;
  const height = container.clientHeight || 260;

  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
  camera.position.set(0, 0.35, 1.9);
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
  renderer.toneMappingExposure = 1.35;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  // Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
  keyLight.position.set(3, 4, 3);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x8cb8ff, 1.4);
  fillLight.position.set(-3, 2, -2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffeedd, 1.8);
  rimLight.position.set(0, -2, -3);
  scene.add(rimLight);

  // Soft contact shadow
  const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const ctx = shadowCanvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
  grad.addColorStop(0, "rgba(0, 0, 0, 0.75)");
  grad.addColorStop(0.5, "rgba(0, 0, 0, 0.25)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -0.36;
  scene.add(shadowMesh);

  // Create real 3D Sneaker Mesh from in-memory geometry
  const pivot = new THREE.Group();
  scene.add(pivot);

  const geometry = decodeSneakerGeometry();

  const colorTunings: Record<string, { color: number; roughness: number; metalness: number }> = {
    "Obsidian Black": { color: 0x1e1e1e, roughness: 0.35, metalness: 0.15 },
    "Deep Indigo": { color: 0x2c467a, roughness: 0.42, metalness: 0.2 },
    "Raw Chalk": { color: 0xd6d2c4, roughness: 0.65, metalness: 0.05 },
  };

  const initialTuning = colorTunings[initialColor] || colorTunings["Deep Indigo"];
  const material = new THREE.MeshStandardMaterial({
    color: initialTuning.color,
    roughness: initialTuning.roughness,
    metalness: initialTuning.metalness,
  });

  const shoeMesh = new THREE.Mesh(geometry, material);
  shoeMesh.castShadow = true;
  shoeMesh.receiveShadow = true;

  // Scale and center the shoe
  pivot.add(shoeMesh);
  pivot.scale.setScalar(0.72);
  pivot.position.set(0, -0.05, 0);

  // Initial dynamic angle
  pivot.rotation.y = -Math.PI / 4;
  pivot.rotation.x = 0.15;

  // Hide loading spinner immediately since loading is 0 ms synchronous!
  const loaderEl = container.parentElement?.querySelector("#loader-hint");
  if (loaderEl) (loaderEl as HTMLElement).style.display = "none";

  function applyColor(color: string) {
    const tuning = colorTunings[color] || colorTunings["Deep Indigo"];
    material.color.setHex(tuning.color);
    material.roughness = tuning.roughness;
    material.metalness = tuning.metalness;
    material.needsUpdate = true;
  }

  // Drag controls
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  let targetRotY = -Math.PI / 4;
  let targetRotX = 0.15;
  let currentRotY = -Math.PI / 4;
  let currentRotX = 0.15;
  let autoRotate = true;
  let idleTimer = 0;

  const onPointerDown = (e: PointerEvent) => {
    isDragging = true;
    autoRotate = false;
    prevX = e.clientX;
    prevY = e.clientY;
    container.style.cursor = "grabbing";
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    prevX = e.clientX;
    prevY = e.clientY;

    targetRotY += dx * 0.012;
    targetRotX += dy * 0.012;
    targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
  };

  const onPointerUp = () => {
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

  let animId = 0;
  const animate = () => {
    animId = requestAnimationFrame(animate);
    if (autoRotate && !isDragging) {
      targetRotY += 0.006;
    }
    currentRotY += (targetRotY - currentRotY) * 0.08;
    currentRotX += (targetRotX - currentRotX) * 0.08;

    pivot.rotation.y = currentRotY;
    pivot.rotation.x = currentRotX;

    renderer.render(scene, camera);
  };
  animate();

  return {
    setColor: (color: string) => {
      applyColor(color);
    },
    captureSnapshot: () => {
      renderer.render(scene, camera);
      const dataUrl = renderer.domElement.toDataURL("image/png");

      cancelAnimationFrame(animId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();

      return dataUrl;
    },
    destroy: () => {
      cancelAnimationFrame(animId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
};
