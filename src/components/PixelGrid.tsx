import React from 'react';
import { usePixelArt } from '../contexts/PixelArtContext';
import './PixelGrid.css';

const PixelGrid: React.FC = () => {
  const { 
    canvasSize, 
    activeColor, 
    getPixel, 
    setPixel, 
    setActiveColor, 
    setActiveTool,
    activeTool, 
    showGrid,
    brushSize,
    zoomLevel,
    startStroke,
    addToStroke,
    endStroke
  } = usePixelArt();

  if (!canvasSize) {
    return null;
  }

  const paintPixels = (centerX: number, centerY: number, color: string) => {
    const halfSize = Math.floor(brushSize / 2);
    const pixelsToPaint = [];
    
    for (let dy = -halfSize; dy <= halfSize; dy++) {
      for (let dx = -halfSize; dx <= halfSize; dx++) {
        const x = centerX + dx;
        const y = centerY + dy;
        
        if (x >= 0 && x < canvasSize.width && y >= 0 && y < canvasSize.height) {
          setPixel(x, y, color);
          pixelsToPaint.push({ x, y, color });
        }
      }
    }
    
    return pixelsToPaint;
  };

  const handlePixelClick = (x: number, y: number) => {
    if (activeTool === 'brush') {
      const pixelsToPaint = paintPixels(x, y, activeColor);
      startStroke();
      pixelsToPaint.forEach(pixel => addToStroke(pixel.x, pixel.y, pixel.color));
      endStroke();
    } else if (activeTool === 'eraser') {
      const pixelsToPaint = paintPixels(x, y, '#ffffff');
      startStroke();
      pixelsToPaint.forEach(pixel => addToStroke(pixel.x, pixel.y, pixel.color));
      endStroke();
    } else if (activeTool === 'picker') {
      const pixelColor = getPixel(x, y);
      setActiveColor(pixelColor);
      setActiveTool('brush');
    }
  };

  const handlePixelMouseDown = (x: number, y: number) => {
    if (activeTool === 'brush' || activeTool === 'eraser') {
      startStroke();
      const color = activeTool === 'brush' ? activeColor : '#ffffff';
      const pixelsToPaint = paintPixels(x, y, color);
      pixelsToPaint.forEach(pixel => addToStroke(pixel.x, pixel.y, pixel.color));
    } else if (activeTool === 'picker') {
      const pixelColor = getPixel(x, y);
      setActiveColor(pixelColor);
      setActiveTool('brush');
    }
  };

  const handlePixelMouseEnter = (e: React.MouseEvent, x: number, y: number) => {
    if (e.buttons === 1) { // Left mouse button is pressed
      if (activeTool === 'brush' || activeTool === 'eraser') {
        const color = activeTool === 'brush' ? activeColor : '#ffffff';
        const pixelsToPaint = paintPixels(x, y, color);
        pixelsToPaint.forEach(pixel => addToStroke(pixel.x, pixel.y, pixel.color));
      }
    }
  };

  const handleMouseUp = () => {
    endStroke();
  };

  const getCursorStyle = () => {
    switch (activeTool) {
      case 'brush':
        return 'crosshair';
      case 'eraser':
        return 'grab';
      case 'picker':
        return 'crosshair';
      default:
        return 'default';
    }
  };

  const renderPixels = () => {
    const pixelElements = [];
    
    for (let y = 0; y < canvasSize.height; y++) {
      for (let x = 0; x < canvasSize.width; x++) {
        const pixelColor = getPixel(x, y);
        const borderClass = showGrid ? 'with-border' : 'no-border';
        pixelElements.push(
          <div
            key={`${x}-${y}`}
            className={`pixel ${borderClass}`}
            style={{ 
              backgroundColor: pixelColor,
              cursor: getCursorStyle()
            }}
            onClick={() => handlePixelClick(x, y)}
            onMouseDown={() => handlePixelMouseDown(x, y)}
            onMouseEnter={(e) => handlePixelMouseEnter(e, x, y)}
            data-x={x}
            data-y={y}
          />
        );
      }
    }
    
    return pixelElements;
  };

  return (
    <div className="pixel-grid-container" onMouseUp={handleMouseUp}>
      <div 
        className={`pixel-grid ${showGrid ? 'with-gap' : 'no-gap'}`}
        style={{
          gridTemplateColumns: `repeat(${canvasSize.width}, 1fr)`,
          gridTemplateRows: `repeat(${canvasSize.height}, 1fr)`,
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left',
        }}
      >
        {renderPixels()}
      </div>
    </div>
  );
};

export default PixelGrid;
