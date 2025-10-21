import React from 'react';
import { usePixelArt } from '../contexts/PixelArtContext';
import './ColorPalette.css';

const ColorPalette: React.FC = () => {
  const { activeColor, setActiveColor } = usePixelArt();

  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'White', value: '#ffffff' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Lime', value: '#84cc16' },
    { name: 'Gray', value: '#6b7280' },
  ];

  const handleColorSelect = (color: string) => {
    setActiveColor(color);
  };

  return (
    <div className="color-palette">
      <h3>Color Palette</h3>
      <div className="color-grid">
        {colors.map((color) => (
          <button
            key={color.value}
            className={`color-swatch ${activeColor === color.value ? 'active' : ''}`}
            style={{ backgroundColor: color.value }}
            onClick={() => handleColorSelect(color.value)}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
      <div className="active-color-info">
        <span>Active Color:</span>
        <div 
          className="active-color-display"
          style={{ backgroundColor: activeColor }}
        />
        <span className="color-hex">{activeColor.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default ColorPalette;
