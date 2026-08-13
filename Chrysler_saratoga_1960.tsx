import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

type ModelCarProps = React.JSX.IntrinsicElements["group"] & {
  bodyColor?: string;
  isHoodOpen?: boolean;
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

export function ModelCar({
  bodyColor = "#3b82f6",
  isHoodOpen = false,
  ...props
}: ModelCarProps) {
  const { nodes, materials } = useGLTF(
    "/models/chrysler_saratoga_1960.glb",
  ) as unknown as GLTFResult;

  const hoodRef = useRef<THREE.Group>(null);

  if (materials.Body) {
    materials.Body.color.set(bodyColor);
  }

  useFrame((_, delta) => {
    if (hoodRef.current) {
      const targetRotation = isHoodOpen ? 0.8 : 0;

      hoodRef.current.rotation.x = THREE.MathUtils.lerp(
        hoodRef.current.rotation.x,
        targetRotation,
        delta * 4, // سرعت انیمیشن
      );
    }
  });

  return (
    <group {...props} dispose={null} scale={0.01}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.Tire} ref={hoodRef}/>

        <mesh geometry={nodes.Object_3.geometry} material={materials.Body} />

        <mesh geometry={nodes.Object_4.geometry} material={materials.Glass} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/chrysler_saratoga_1960.glb");
