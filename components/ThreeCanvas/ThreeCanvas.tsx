import { ModelCar } from "@/Chrysler_saratoga_1960";
import {
  CameraControls,
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Mesh } from "three";
import { CameraRig } from "./CameraRig/CameraRig";
import { CameraPreset } from "./CameraRig/cameraPreset";

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
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [cameraView, setCameraView] = useState<CameraPreset>("overview");




  return (
    <>
      <div className="w-full h-100 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
        <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight intensity={2} position={[5, 5, 5]} />

          <Environment preset="city" environmentIntensity={1.2} />

          {/* <OrbitControls
            autoRotate
            autoRotateSpeed={1.5}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
          /> */}

        <CameraRig currentPreset={cameraView}/>

          {/* <SpinningBox /> */}
          <Suspense fallback={null}>
            <ModelCar bodyColor={selectedColor} />
            <ContactShadows
              position={[0, -0.01, 0]}
              opacity={0.75}
              scale={10}
              blur={2.5}
              far={4}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setSelectedColor("#ef4444")}
          className="w-8 h-8 rounded-full bg-red-500 border-2 border-white cursor-pointer"
        />
        <button
          onClick={() => setSelectedColor("#3b82f6")}
          className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white cursor-pointer"
        />
        <button
          onClick={() => setSelectedColor("#10b981")}
          className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          className="p-2 m-2 rounded-2xl border border-gray-300 cursor-pointer"
          onClick={()=>setCameraView("wheel")}
        >
          wheel
        </button>
        <button
          className="p-2 m-2 rounded-2xl border border-gray-300 cursor-pointer"
          onClick={()=>setCameraView("rear")}
        >
         rear
        </button>
        <button
          className="p-2 m-2 rounded-2xl border border-gray-300 cursor-pointer"
          onClick={()=>setCameraView("interior")}
        >
         interior
        </button>
        <button
          className="p-2 m-2 rounded-2xl border border-gray-300 cursor-pointer"
          onClick={()=>setCameraView("overview")}
        >
          reset view
        </button>
      </div>
    </>
  );
}

export default ThreeCanvas;
