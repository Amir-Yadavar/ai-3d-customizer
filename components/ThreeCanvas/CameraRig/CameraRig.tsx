'use client';

import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { CAMERA_PRESETS, CameraPreset } from './cameraPreset';

interface CameraRigProps {
  currentPreset: CameraPreset;
}

export function CameraRig({ currentPreset }: CameraRigProps) {
  
  const controlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    const config = CAMERA_PRESETS[currentPreset];
    if (controlsRef.current && config) {
     
      controlsRef.current.setLookAt(
        ...config.position,
        ...config.target,
        true // enableTransition
      );
    }
  }, [currentPreset]);

  return (
    <CameraControls
      ref={controlsRef}
      smoothTime={0.8}
      maxPolarAngle={Math.PI / 2} // عدم رفتن دوربین به زیر زمین
    />
  );
}