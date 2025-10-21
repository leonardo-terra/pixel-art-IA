import React from 'react';
import { usePixelArt } from '../contexts/PixelArtContext';
import './Toolbar.css';

interface ToolbarProps {
  onClearCanvas: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClearCanvas }) => {
  const { activeTool, setActiveTool, showGrid, setShowGrid } = usePixelArt();
  
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
    </div>
  );
};

export default Toolbar;
