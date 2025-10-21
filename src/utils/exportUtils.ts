export const exportCanvasAsJPEG = (
  pixels: { [key: string]: string },
  canvasSize: { width: number; height: number },
  filename: string = 'pixel-art.jpg'
): void => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    console.error('Could not get canvas context');
    return;
  }
  
  // Set canvas size to match pixel dimensions
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
  
  // Fill with white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
  
  // Draw each pixel
  for (let y = 0; y < canvasSize.height; y++) {
    for (let x = 0; x < canvasSize.width; x++) {
      const key = `${x},${y}`;
      const color = pixels[key];
      
      if (color && color !== '#ffffff') {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  
  // Convert to JPEG and download
  canvas.toBlob((blob) => {
    if (!blob) {
      console.error('Could not create blob');
      return;
    }
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/jpeg', 0.9);
};
