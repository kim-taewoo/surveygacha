"use client";

import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function Capsule({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={Math.random() > 0.5 ? "#ffffff" : "#ffff40"}
        metalness={0.1}
        roughness={0.2}
      />
    </mesh>
  );
}

export function GachaMachine() {
  const group = useRef(null);
  // Generate random positions for capsules
  const capsules = Array(30).fill().map(() => [
    (Math.random() - 0.5) * 1.2,
    Math.random() * 0.5 - 0.5,
    (Math.random() - 0.5) * 1.2,
  ]);

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.2} />
      <ambientLight intensity={1.5} />
      <group ref={group}>
        {/* Metal Top */}
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Glass Dome */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            metalness={0.1}
            roughness={0.1}
          />
        </mesh>

        {/* Center Rod */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.4, 8]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Base's Top */}
        <mesh position={[0, -1.6, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.2, 32]} />
          <meshStandardMaterial
            color="#e0e0e0"
            metalness={0.3}
            roughness={0.3}
          />
        </mesh>

        {/* Base */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.8, 0.9, 1, 32]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        {/* Base's Base */}
        <mesh position={[0, -1.6, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.2, 32]} />
          <meshStandardMaterial
            color="#e0e0e0"
            metalness={0.3}
            roughness={0.3}
          />
        </mesh>

        {/* Coin Mechanism Lever */}
        <group position={[0, -0.8, 0.83]} rotation={[Math.PI / 2.1, 0, 0]}>
          {/* Rounded Base Plate */}
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
            <meshStandardMaterial color="#e0e0e0" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Inner Circle */}
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
            <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.4} />
          </mesh>
          {/* Box Handle */}
          <mesh position={[0, 0.07, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.08]} />
            <meshStandardMaterial color="#e0e0e0" metalness={0.8} roughness={0.4} />
          </mesh>
        </group>

        {/* Dispenser Opening */}
        <mesh position={[0, -1.3, 0.9]} rotation={[Math.PI / 1.03, 0, 0]}>
          <boxGeometry args={[0.4, 0.45, 0.03]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Capsules */}
        {capsules.map((position, index) => (
          <Capsule key={index} position={position} />
        ))}
      </group>
    </>
  );
}
