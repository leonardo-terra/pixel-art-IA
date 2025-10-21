import React from 'react';
import { usePixelArt } from '../contexts/PixelArtContext';
import './PixelGrid.css';

const PixelGrid: React.FC = () => {
  const { canvasSize, activeColor, getPixel, setPixel } = usePixelArt();

  if (!canvasSize) {
    return null;
  }

  const handlePixelClick = (x: number, y: number) => {
    setPixel(x, y, activeColor);
  };

  const handlePixelMouseDown = (x: number, y: number) => {
    setPixel(x, y, activeColor);
  };

  const handlePixelMouseEnter = (e: React.MouseEvent, x: number, y: number) => {
    if (e.buttons === 1) { // Left mouse button is pressed
      setPixel(x, y, activeColor);
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
            className="pixel"
            style={{ backgroundColor: pixelColor }}
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
