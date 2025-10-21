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
    showGrid 
  } = usePixelArt();

  if (!canvasSize) {
    return null;
  }

  const handlePixelClick = (x: number, y: number) => {
    if (activeTool === 'brush') {
      setPixel(x, y, activeColor);
    } else if (activeTool === 'eraser') {
      setPixel(x, y, '#ffffff'); // Erase to white
    } else if (activeTool === 'picker') {
      const pixelColor = getPixel(x, y);
      setActiveColor(pixelColor);
      // Auto-switch back to brush after picking color
      setActiveTool('brush');
    }
  };

  const handlePixelMouseDown = (x: number, y: number) => {
    if (activeTool === 'brush') {
      setPixel(x, y, activeColor);
    } else if (activeTool === 'eraser') {
      setPixel(x, y, '#ffffff');
    } else if (activeTool === 'picker') {
      const pixelColor = getPixel(x, y);
      setActiveColor(pixelColor);
      setActiveTool('brush');
    }
  };

  const handlePixelMouseEnter = (e: React.MouseEvent, x: number, y: number) => {
    if (e.buttons === 1) { // Left mouse button is pressed
      if (activeTool === 'brush') {
        setPixel(x, y, activeColor);
      } else if (activeTool === 'eraser') {
        setPixel(x, y, '#ffffff');
      }
    }
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
        pixelElements.push(
          <div
            key={`${x}-${y}`}
            className={`pixel ${showGrid ? 'with-border' : 'no-border'}`}
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
    <div className="pixel-grid-container">
      <div 
        className="pixel-grid"
        style={{
          gridTemplateColumns: `repeat(${canvasSize.width}, 1fr)`,
          gridTemplateRows: `repeat(${canvasSize.height}, 1fr)`,
        }}
      >
        {renderPixels()}
      </div>
    </div>
  );
};

export default PixelGrid;
