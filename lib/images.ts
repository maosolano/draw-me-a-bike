// In production, populate public/images/ with your JPG files named bike-001.jpg, bike-002.jpg, etc.
// This module returns the list of image paths available to the grid.

export function getImagePaths(): string[] {
  // Placeholder list — replace with a dynamic import or a generated manifest
  // once real images are in public/images/
  return Array.from({ length: 20 }, (_, i) =>
    `/images/bike-${String(i + 1).padStart(3, '0')}.svg`
  )
}
