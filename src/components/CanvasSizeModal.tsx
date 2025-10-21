import React, { useState } from 'react';
import './CanvasSizeModal.css';

interface CanvasSizeModalProps {
  isOpen: boolean;
  onClose: (width: number, height: number) => void;
}

const CanvasSizeModal: React.FC<CanvasSizeModalProps> = ({ isOpen, onClose }) => {
  const [width, setWidth] = useState<number>(32);
  const [height, setHeight] = useState<number>(32);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (width > 0 && height > 0) {
      onClose(width, height);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setWidth(value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setHeight(value);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Canvas</h2>
        <p>Set the dimensions for your pixel art canvas</p>
        
        <form onSubmit={handleSubmit} className="canvas-form">
          <div className="input-group">
            <label htmlFor="width">Width (pixels):</label>
            <input
              id="width"
              type="number"
              min="1"
              max="512"
              value={width}
              onChange={handleWidthChange}
              placeholder="32"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="height">Height (pixels):</label>
            <input
              id="height"
              type="number"
              min="1"
              max="512"
              value={height}
              onChange={handleHeightChange}
              placeholder="32"
              required
            />
          </div>
          
          <div className="button-group">
            <button type="submit" className="create-button">
              Create Canvas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CanvasSizeModal;
