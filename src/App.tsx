import { useState } from 'react'
import { PixelArtProvider, usePixelArt } from './contexts/PixelArtContext'
import CanvasSizeModal from './components/CanvasSizeModal'
import ClearCanvasModal from './components/ClearCanvasModal'
import PixelGrid from './components/PixelGrid'
import ColorPalette from './components/ColorPalette'
import Toolbar from './components/Toolbar'
import './App.css'

const AppContent: React.FC = () => {
  const { canvasSize, setCanvasSize, clearCanvas } = usePixelArt()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isClearModalOpen, setIsClearModalOpen] = useState(false)

  const handleModalClose = (width: number, height: number) => {
    setCanvasSize({ width, height })
    setIsModalOpen(false)
  }

  const handleClearCanvas = () => {
    setIsClearModalOpen(true)
  }

  const handleConfirmClear = () => {
    clearCanvas()
    setIsClearModalOpen(false)
    setIsModalOpen(true) // Show canvas size modal to start new drawing
  }

  const handleCancelClear = () => {
    setIsClearModalOpen(false)
  }

  return (
    <>
      <h1>Pixel Art Editor</h1>
      
      {canvasSize ? (
        <div className="editor-container">
          <div className="editor-sidebar">
            <Toolbar onClearCanvas={handleClearCanvas} />
            <ColorPalette />
          </div>
          <div className="editor-main">
            <PixelGrid />
          </div>
        </div>
      ) : (
        <div className="welcome-message">
          <p>Welcome to Pixel Art Editor! Let's create your canvas.</p>
        </div>
      )}

      <CanvasSizeModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
      />
      
      <ClearCanvasModal
        isOpen={isClearModalOpen}
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
      />
    </>
  )
}

function App() {
  return (
    <PixelArtProvider>
      <AppContent />
    </PixelArtProvider>
  )
}

export default App
