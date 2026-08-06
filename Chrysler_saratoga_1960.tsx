import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import React from "react";

type ModelCarProps = React.JSX.IntrinsicElements["group"] & {
  bodyColor?: string;
};

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
  };
  materials: {
    Tire: THREE.MeshStandardMaterial;
    Body: THREE.MeshStandardMaterial;
    Glass: THREE.MeshStandardMaterial;
  };
};

export function ModelCar({ bodyColor = "#3b82f6", ...props }: ModelCarProps) {
  const { nodes, materials } = useGLTF(
    "/models/chrysler_saratoga_1960.glb",
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null} scale={0.01}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.Tire} />

        <mesh geometry={nodes.Object_3.geometry}>
          <meshStandardMaterial
            color={bodyColor}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        <mesh geometry={nodes.Object_4.geometry} material={materials.Glass} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/chrysler_saratoga_1960.glb");
