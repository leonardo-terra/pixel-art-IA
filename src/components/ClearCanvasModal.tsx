import React from 'react';
import './ClearCanvasModal.css';

interface ClearCanvasModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ClearCanvasModal: React.FC<ClearCanvasModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Clear Canvas</h2>
        <p>Are you sure you want to clear the canvas? All unsaved progress will be lost.</p>
        
        <div className="modal-buttons">
          <button 
            className="cancel-button" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="confirm-button" 
            onClick={onConfirm}
          >
            Clear Canvas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearCanvasModal;
