"use client";

import { Canvas } from "@react-three/fiber";

import { GachaMachine } from "./GachaMachine";

export function GachaMachineR3F() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-1.5, 0, 7],
      }}
    >
      <GachaMachine />
    </Canvas>
  );
}
