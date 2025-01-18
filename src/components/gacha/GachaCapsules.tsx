import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { memo, useEffect, useMemo, useRef } from "react";

import { GachaCapsule } from "./GachaCapsule";

const COUNT = 60;

const clampValue = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

interface Props {
  containerRadius?: number;
  animationPhase: "initial" | "firstSpin" | "pause" | "secondSpin";
}

const GachaCapsulesImpl = ({ containerRadius = 1.2, animationPhase }: Props) => {
  const rigidBodyRefs = useRef<RapierRigidBody[]>([]);
  // Function to generate random position within a sphere
  const getRandomPositionInSphere = (radius: number) => {
    // Generate random spherical coordinates
    const u = Math.random();
    const v = Math.random();

    // Calculate radius with cubic root for uniform distribution
    const r = radius * 0.5 * Math.cbrt(Math.random()); // 0.8 to keep some margin from the walls

    // Convert to spherical coordinates
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    // Convert to Cartesian coordinates
    return [
      clampValue(r * Math.sin(phi) * Math.cos(theta), -0.38, 0.38), // Add 0.4 to match container position
      Math.max((r * Math.sin(phi) * Math.sin(theta)), 0.4), // Add 0.4 to match container position
      clampValue(r * Math.cos(phi), -0.38, 0.38), // Add 0.4 to match container position
    ];
  };

  // Generate random positions and rotations
  const capsules = useMemo(() => {
    const colors = ["#ffff40", "#ffffff", "#ff4040", "#40ff40", "#4040ff"];
    const capsules = Array.from({ length: COUNT }, () => ({
      position: getRandomPositionInSphere(containerRadius),
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    return capsules;
  }, [containerRadius]);

  useEffect(() => {
    if (animationPhase === "initial" || animationPhase === "pause") return;
    // apply Impulse to some of the capsules
    const randomCapsules = rigidBodyRefs.current.filter(() => Math.random() > 0.5);
    randomCapsules.forEach((capsule) => {
      const rigidBody = capsule;
      rigidBody.applyImpulse({ x: 0.05, y: 0.05, z: 0.05 }, true);
    });
  }, [animationPhase]);

  return (
    <>
      {capsules.map((capsule, index) => (
        <RigidBody
          key={index}
          ref={(el) => {
            if (el) (rigidBodyRefs.current[index] = el);
          }}
          position={capsule.position}
          rotation={capsule.rotation}
          colliders="ball"
        >
          <GachaCapsule position={capsule.position as [number, number, number]} color={capsule.color} size={0.3} />
        </RigidBody>
      ))}
    </>
  );
};

export const GachaCapsules = memo(GachaCapsulesImpl);
