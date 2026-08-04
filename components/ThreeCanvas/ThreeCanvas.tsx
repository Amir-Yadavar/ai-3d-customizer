import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

function SpinningBox() {
  // ۱. ساخت ارجاع به جنس Mesh
  const meshRef = useRef<Mesh>(null!);

  // ۲. این هوک ۶۰ بار در ثانیه اجرا می‌شه
  useFrame((state, delta) => {
    if (meshRef.current) {
      // توی هر فریم، مقداری روی محور Y و X می‌چرخونیمش
      meshRef.current.rotation.y += delta;
      meshRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}

function ThreeCanvas() {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
      <Canvas>
        <ambientLight intensity={1.5} />
        <directionalLight intensity={2} position={[5, 5, 5]} />

        <OrbitControls />

        <SpinningBox />
      </Canvas>
    </div>
  );
}

export default ThreeCanvas;
