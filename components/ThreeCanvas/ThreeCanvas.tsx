import { ModelCar } from "@/Chrysler_saratoga_1960";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Mesh } from "three";

function SpinningBox() {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const meshRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta;
      meshRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color={hovered ? "red" : "#3b82f6"} />
    </mesh>
  );
}

// function WatchModel() {
//   const { scene } = useGLTF("/models/chrysler_saratoga_1960.glb");
//   return <primitive object={scene} scale={0.01} />;
// }

function ThreeCanvas() {

  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  return (
    <>
    <div className="w-full h-100 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
      <Canvas>
        <ambientLight intensity={1.5} />
        <directionalLight intensity={2} position={[5, 5, 5]} />

        <OrbitControls />

        {/* <SpinningBox /> */}
       <Suspense fallback={null}>
          <ModelCar bodyColor={selectedColor}/>
        </Suspense>
      </Canvas>

      
    </div>
<div className="flex justify-center gap-3">
        <button 
          onClick={() => setSelectedColor('#ef4444')}
          className="w-8 h-8 rounded-full bg-red-500 border-2 border-white cursor-pointer"
        />
        <button 
          onClick={() => setSelectedColor('#3b82f6')}
          className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white cursor-pointer"
        />
        <button 
          onClick={() => setSelectedColor('#10b981')}
          className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white cursor-pointer"
        />
      </div>
    </>
  );
}

export default ThreeCanvas;
