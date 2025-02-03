"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function GachaMachineWithThree() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [capsules, setCapsules] = useState<THREE.Mesh[]>([]);
  const fallenCapsulesRef = useRef<THREE.Mesh[]>([]); // useRef로 fallenCapsules 관리
  const [button, setButton] = useState<THREE.Mesh | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameMessage, setGameMessage] = useState("3D뷰 내의 빨간 버튼을 클릭해서 가챠폰을 돌려보세요!");
  const [showModal, setShowModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const capsuleRadius = 0.6;

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const newScene = new THREE.Scene();
    const newCamera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const newRenderer = new THREE.WebGLRenderer({ antialias: true });

    newRenderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(newRenderer.domElement);

    // Lights
    newScene.add(new THREE.AmbientLight(0xffffff, 2));
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    newScene.add(pointLight);

    // Machine body
    // const machineGeometry = new THREE.CylinderGeometry(3, 3, 9, 32, 1, true);
    const machineGeometry = new THREE.SphereGeometry(5, 64, 32);
    const machineMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });
    const machineMesh = new THREE.Mesh(machineGeometry, machineMaterial);
    machineMesh.position.set(0, 4.5 + 3, 0);
    newScene.add(machineMesh);

    // Machine lid
    const lidGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 10);
    const lidMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 });
    const lid = new THREE.Mesh(lidGeometry, lidMaterial);
    lid.position.set(0, 9.25 + 3.25, 0);
    newScene.add(lid);

    // Base
    const baseGeometry = new THREE.CylinderGeometry(3, 5, 3, 32);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.set(0, 0.5, 0);
    newScene.add(baseMesh);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    newScene.add(floorMesh);

    // Button
    const newButton = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 0.15, 32),
      new THREE.MeshPhongMaterial({ color: 0xff0000 }),
    );
    newButton.position.set(0, 1.05 + 2, 3 + 2);
    newButton.rotation.x = Math.PI / 2;
    newScene.add(newButton);

    // Output hole
    const outputHole = new THREE.Mesh(
      new THREE.CircleGeometry(0.6, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    );
    outputHole.position.set(0, 0.51 + 1, 3 + 2);
    outputHole.rotation.x = -Math.PI / 2;
    newScene.add(outputHole);

    // Create initial capsules
    const newCapsules = createStackedCapsules(newScene);

    newCamera.position.set(0, 12, 20);
    newCamera.lookAt(0, 3, 0);

    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);
    setButton(newButton);
    setCapsules(newCapsules);

    // Animation
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      updatePhysics();
      newRenderer.render(newScene, newCamera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(newRenderer.domElement);
      }
    };
  }, []);

  const createStackedCapsules = (scene: THREE.Scene): THREE.Mesh[] => {
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
    const baseHeight = 3;
    const maxCapsules = 30;
    const newCapsules: THREE.Mesh[] = [];

    const createSmoothColoredSphere = (color: number) => {
      const sphereGeometry = new THREE.SphereGeometry(capsuleRadius, 64, 64);
      const sphereMaterial = new THREE.ShaderMaterial({
        uniforms: {
          color1: { value: new THREE.Color(0xffffff) },
          color2: { value: new THREE.Color(color) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          varying vec2 vUv;
          void main() {
            gl_FragColor = vec4(mix(color1, color2, step(0.5, vUv.y)), 1.0);
          }
        `,
      });
      return new THREE.Mesh(sphereGeometry, sphereMaterial);
    };

    for (let i = 0; i < maxCapsules; i++) {
      const capsule = createSmoothColoredSphere(
        colors[Math.floor(Math.random() * colors.length)],
      );
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.4;
      capsule.position.set(
        Math.cos(angle) * radius,
        baseHeight + capsuleRadius + (i < 16 ? 0 : Math.random() * 6),
        Math.sin(angle) * radius,
      );
      capsule.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );
      scene.add(capsule);
      newCapsules.push(capsule);
    }

    return newCapsules;
  };

  const updatePhysics = () => {
    fallenCapsulesRef.current.forEach((capsule) => {
      if (!capsule.userData.velocity) return;
      capsule.userData.velocity.y -= 0.01;
      capsule.userData.velocity.multiplyScalar(0.98);
      capsule.position.add(capsule.userData.velocity);
      capsule.rotation.x += capsule.userData.angularVelocity.x;
      capsule.rotation.y += capsule.userData.angularVelocity.y;
      capsule.rotation.z += capsule.userData.angularVelocity.z;
      capsule.userData.angularVelocity.multiplyScalar(0.98);

      if (capsule.position.y < capsuleRadius) {
        capsule.position.y = capsuleRadius;
        capsule.userData.velocity.y *= -0.6;
        capsule.userData.velocity.x *= 0.90;
        capsule.userData.velocity.z *= 0.90;
      }

      const wallRadius = 15;
      const distance = Math.sqrt(
        capsule.position.x ** 2 + capsule.position.z ** 2,
      );
      if (distance > wallRadius) {
        const normal = new THREE.Vector3(
          capsule.position.x,
          0,
          capsule.position.z,
        ).normalize();
        capsule.position.setX(normal.x * wallRadius);
        capsule.position.setZ(normal.z * wallRadius);
        capsule.userData.velocity
          .reflect(normal)
          .multiplyScalar(0.7);
      }
    });
  };

  const handleClick = (event: MouseEvent) => {
    if (!scene || !camera || isSpinning || !button) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(
      [button, ...fallenCapsulesRef.current],
      false,
    );

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      if (clickedObject === button && capsules.length > 0) {
        button.rotation.z += Math.PI / 6;
        setTimeout(() => {
          button.rotation.z -= Math.PI / 6;
          spinGacha();
        }, 200);
      }
      else if (fallenCapsulesRef.current.includes(clickedObject as THREE.Mesh)) {
        showResult(clickedObject as THREE.Mesh);
      }
    }
  };

  const spinGacha = () => {
    if (!scene) return;
    setIsSpinning(true);
    setGameMessage("캡슐이 나오는 중입니다...");

    const selectedCapsule = capsules[capsules.length - 1];
    selectedCapsule.position.set(0, 0.51 + 1, 3 + 2);

    const angle = (Math.random() - 0.5) * (Math.PI / 3);
    const speed = 0.2 + Math.random() * 0.1;
    selectedCapsule.userData.velocity = new THREE.Vector3(
      Math.sin(angle) * speed,
      0.1 + Math.random() * 0.1,
      Math.cos(angle) * speed,
    );
    selectedCapsule.userData.angularVelocity = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5,
    ).multiplyScalar(0.2);

    fallenCapsulesRef.current = [...fallenCapsulesRef.current, selectedCapsule];
    setCapsules(capsules.slice(0, -1));

    setIsSpinning(false);
    setGameMessage(
      capsules.length - 1 > 0
        ? "캡슐이 나왔습니다! 다시 돌려보시겠어요?"
        : "캡슐이 모두 소진되었습니다.",
    );
  };

  const showResult = (capsule: THREE.Mesh) => {
    const results = ["당첨", "대박", "꽝"];
    const result = results[Math.floor(Math.random() * results.length)];
    setResultMessage(result);
    setShowModal(true);

    // @ts-expect-error 사용하지 않을 부분
    const originalColor = capsule.material.uniforms.color2.value.getHex();
    // @ts-expect-error 사용하지 않을 부분
    capsule.material.uniforms.color2.value.setHex(0xffff00);
    setTimeout(() => {
    // @ts-expect-error 사용하지 않을 부분
      capsule.material.uniforms.color2.value.setHex(originalColor);
    }, 1000);
  };

  return (
    <div className="relative h-screen w-full">
      <div
        ref={mountRef}
        className="size-full"
        onClick={e => handleClick(e as any)}
      />
      <div className="absolute top-4 w-full text-center text-lg text-white shadow-sm">
        {gameMessage}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">결과</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-center text-2xl">{resultMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
