"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";

import { GachaCapsules } from "./GachaCapsules";

export function GachaMachine() {
  const group = useRef(null);
  const leverRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationProgress, setRotationProgress] = useState(0);

  // Add state to track animation phase
  const [animationPhase, setAnimationPhase] = useState<"initial" | "firstSpin" | "pause" | "secondSpin">("initial");
  const [pauseStartTime, setPauseStartTime] = useState<number>(0);

  function handleAnimationFinished() {
    console.log("Animation finished!");
  }

  // Handle lever rotation animation
  useFrame((state, delta) => {
    if (leverRef.current && isRotating) {
      const firstRotation = -Math.PI * 1; // First full circle
      const finalRotation = -Math.PI * 2; // Second full circle
      const rotationSpeed = -1.77;

      switch (animationPhase) {
        case "initial":
        // Start first rotation
          setAnimationPhase("firstSpin");
          break;

        case "firstSpin":
        // First rotation
          const newProgress = rotationProgress + (rotationSpeed * delta * Math.PI);
          setRotationProgress(newProgress);
          leverRef.current.rotation.y = newProgress;

          // Check if first rotation is complete
          if (newProgress <= firstRotation) {
            setAnimationPhase("pause");
            setPauseStartTime(state.clock.elapsedTime);
          }
          break;

        case "pause":
        // Check if pause duration (1 second) is complete
          if (state.clock.elapsedTime - pauseStartTime >= 0.3) {
            setAnimationPhase("secondSpin");
          }
          break;

        case "secondSpin":
        // Second rotation
          const finalProgress = rotationProgress + (rotationSpeed * delta * Math.PI);
          setRotationProgress(finalProgress);
          leverRef.current.rotation.y = finalProgress;

          // Check if animation is complete
          if (finalProgress <= finalRotation) {
            setIsRotating(false);
            setRotationProgress(0);
            setAnimationPhase("initial");
            handleAnimationFinished();
          }
          break;
      }
    }
  });

  const handleLeverClick = () => {
    if (!isRotating) {
      setIsRotating(true);
    }
  };

  // Function to generate points on the bottom half of sphere
  const generateSphericalPoints = (samples = 10) => {
    const points = [];

    // Generate points for bottom hemisphere
    for (let i = 0; i < samples; i++) {
      // Modify y range to only go from 0 to -1 (bottom half)
      const y = -(i / (samples - 1)); // y goes from 0 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y

      // Generate multiple points at each y level for better coverage
      const numPointsAtLevel = Math.ceil(radius * 8); // More points for larger radius
      for (let j = 0; j < numPointsAtLevel; j++) {
        const angleAtLevel = (j / numPointsAtLevel) * Math.PI * 2;
        const x = Math.cos(angleAtLevel) * radius;
        const z = Math.sin(angleAtLevel) * radius;
        points.push([x, y, z]);
      }
    }
    return points;
  };

  const points = generateSphericalPoints(25);

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.2} />
      <ambientLight intensity={1.5} />
      <Physics>

        <group ref={group}>
          {/* Metal Top */}
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.4} roughness={0.4} />
          </mesh>

          {/* Glass Dome */}
          {/* <RigidBody type="fixed" colliders="ball"> */}
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

          {/* Physics colliders */}
          <RigidBody type="fixed" position={[0, 0.4, 0]}>
            {/* Bottom */}
            <CuboidCollider args={[1.2, 0.1, 1.2]} position={[0, -1.03, 0]} />
            {/* Top */}
            <CuboidCollider args={[1.2, 0.1, 1.2]} position={[0, 1.1, 0]} />
            {/* Front */}
            <CuboidCollider args={[1.2, 1.2, 0.1]} position={[0, 0, 1.1]} />
            {/* Back */}
            <CuboidCollider args={[1.2, 1.2, 0.1]} position={[0, 0, -1.1]} />
            {/* Left */}
            <CuboidCollider args={[0.1, 1.2, 1.2]} position={[-1.1, 0, 0]} />
            {/* Right */}
            <CuboidCollider args={[0.1, 1.2, 1.2]} position={[1.1, 0, 0]} />

            {points.map((point, index) => {
              const [x, y, z] = point;
              const colliderSize = [0.3, 0.01, 0.3]; // width, height, depth

              // Calculate angles to face center
              const phi = Math.atan2(Math.sqrt(x * x + z * z), y);
              const theta = Math.atan2(z, x);

              return (
                <CuboidCollider
                  key={index}
                  args={colliderSize as [number, number, number]}
                  position={[x * 1.2, y * 1.21, z * 1.2]}
                  rotation={[
                    phi, // X rotation
                    0, // Y rotation
                    theta + Math.PI / 2, // Z rotation
                  ]}
                />
              );
            })}
          </RigidBody>

          <GachaCapsules containerRadius={1.2} animationPhase={animationPhase} />

          {/* Center Rod */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 2.4, 8]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.6} roughness={0.4} />
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
            <group ref={leverRef}>
              <mesh onPointerDown={handleLeverClick} position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
                <meshStandardMaterial
                  color="#C0C0C0"
                  metalness={0.6}
                  roughness={0.2}
                />
              </mesh>
              {/* Box Handle */}
              <mesh position={[0, 0.07, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.3, 0.1, 0.08]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.2} />
              </mesh>
            </group>
            {/* Inner Circle */}
          </group>

          {/* Dispenser Opening */}
          <mesh position={[0, -1.27, 0.88]} rotation={[Math.PI / 1.05, 0, 0]}>
            <boxGeometry args={[0.4, 0.43, 0.03]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.3} roughness={0.5} />
          </mesh>
        </group>
      </Physics>
    </>
  );
}
