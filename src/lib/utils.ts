import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateParticles(count: number = 50) {
  // Use deterministic values to avoid hydration mismatch
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 17.3) % 100,
    y: (i * 23.7) % 100,
    size: (i % 4) + 1,
    speed: (i % 2) + 1,
    opacity: ((i % 5) * 0.1) + 0.1,
  }))
}

export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor
}

export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  return ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin
} 