export type CameraPreset = 'overview' | 'wheel' | 'interior' | 'rear';

export interface CameraPosition {
  position: [number, number, number]; // مختصات دوربین [X, Y, Z]
  target: [number, number, number];   // نقطه‌ای که دوربین بهش نگاه می‌کنه
}

export const CAMERA_PRESETS: Record<CameraPreset, CameraPosition> = {
  overview: { position: [5, 2, 5], target: [0, 0, 0] },
  wheel: { position: [1.8, 0.4, 1.8], target: [1, -0.2, 0.8] },
  interior: { position: [0, 0.8, 0.3], target: [0, 0.8, 1] },
  rear: { position: [0, 1.5, -5], target: [0, 0.5, 0] },
};