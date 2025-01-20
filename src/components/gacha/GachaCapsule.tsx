import { Merged } from "@react-three/drei";

interface Props {
  size?: number;
  color?: string;
  position: [number, number, number];
}

export const GachaCapsule = ({ size = 0.3, color = "#ff00ff", position }: Props) => {
  return (

    <group position={position}>
      <mesh position={[0, size * 0.25, 0]}>
        <sphereGeometry
          args={[size * 0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshStandardMaterial
          color={color}
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>

      {/* Top half - white */}
      <mesh position={[0, size * 0.25, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry
          args={[size * 0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>
    </group>

  );
};
