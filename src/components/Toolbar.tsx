import React from 'react';
import { usePixelArt } from '../contexts/PixelArtContext';
import { exportCanvasAsJPEG } from '../utils/exportUtils';
import './Toolbar.css';

interface ToolbarProps {
  onClearCanvas: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClearCanvas }) => {
  const { 
    activeTool, 
    setActiveTool, 
    showGrid, 
    setShowGrid,
    brushSize,
    setBrushSize,
    zoomLevel,
    setZoomLevel,
    canUndo,
    canRedo,
    undo,
    redo,
    pixels,
    canvasSize
  } = usePixelArt();
  
  const tools = [
    { id: 'brush', name: 'Brush', icon: '🖌️' },
    { id: 'eraser', name: 'Eraser', icon: '🧹' },
    { id: 'picker', name: 'Color Picker', icon: '👁️' },
  ];

  return (
    <div className="toolbar">
      <h3>Tools</h3>
      <div className="tool-buttons">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`tool-button ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => setActiveTool(tool.id)}
            title={tool.name}
            aria-label={`Select ${tool.name} tool`}
          >
            <span className="tool-icon">{tool.icon}</span>
            <span className="tool-name">{tool.name}</span>
          </button>
        ))}
      </div>
      
      <div className="toolbar-section">
        <h4>History</h4>
        <div className="history-controls">
          <button
            className={`tool-button ${!canUndo ? 'disabled' : ''}`}
            onClick={undo}
            disabled={!canUndo}
            title="Undo"
            aria-label="Undo last action"
          >
            <span className="tool-icon">↶</span>
            <span className="tool-name">Undo</span>
          </button>
          
          <button
            className={`tool-button ${!canRedo ? 'disabled' : ''}`}
            onClick={redo}
            disabled={!canRedo}
            title="Redo"
            aria-label="Redo last action"
          >
            <span className="tool-icon">↷</span>
            <span className="tool-name">Redo</span>
          </button>
        </div>
      </div>

      <div className="toolbar-section">
        <h4>Brush Size</h4>
        <div className="size-controls">
          <button
            className="tool-button size-button"
            onClick={() => setBrushSize(Math.max(1, brushSize - 1))}
            title="Decrease brush size"
            aria-label="Decrease brush size"
          >
            <span className="tool-icon">−</span>
          </button>
          
          <span className="size-display">{brushSize}x{brushSize}</span>
          
          <button
            className="tool-button size-button"
            onClick={() => setBrushSize(Math.min(10, brushSize + 1))}
            title="Increase brush size"
            aria-label="Increase brush size"
          >
            <span className="tool-icon">+</span>
          </button>
        </div>
      </div>

      <div className="toolbar-section">
        <h4>Zoom</h4>
        <div className="zoom-controls">
          <button
            className="tool-button zoom-button"
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <span className="tool-icon">−</span>
          </button>
          
          <span className="zoom-display">{Math.round(zoomLevel * 100)}%</span>
          
          <button
            className="tool-button zoom-button"
            onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.1))}
            title="Zoom In"
            aria-label="Zoom in"
          >
            <span className="tool-icon">+</span>
          </button>
        </div>
      </div>

      <div className="toolbar-section">
        <h4>Canvas</h4>
        <div className="canvas-controls">
          <button
            className="tool-button clear-button"
            onClick={onClearCanvas}
            title="Clear Canvas"
            aria-label="Clear canvas"
          >
            <span className="tool-icon">🗑️</span>
            <span className="tool-name">Clear</span>
          </button>
          
          <button
            className={`tool-button toggle-button ${showGrid ? 'active' : ''}`}
            onClick={() => setShowGrid(!showGrid)}
            title={showGrid ? 'Hide Grid' : 'Show Grid'}
            aria-label={showGrid ? 'Hide grid' : 'Show grid'}
          >
            <span className="tool-icon">⊞</span>
            <span className="tool-name">{showGrid ? 'Hide Grid' : 'Show Grid'}</span>
          </button>
        </div>
      </div>

      <div className="toolbar-section">
        <h4>Export</h4>
        <div className="export-controls">
          <button
            className="tool-button export-button"
            onClick={() => {
              if (canvasSize) {
                const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                exportCanvasAsJPEG(pixels, canvasSize, `pixel-art-${timestamp}.jpg`);
              }
            }}
            title="Export as JPEG"
            aria-label="Export canvas as JPEG"
          >
            <span className="tool-icon">💾</span>
            <span className="tool-name">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
