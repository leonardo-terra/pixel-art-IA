import { useState } from 'react'
import { PixelArtProvider, usePixelArt } from './contexts/PixelArtContext'
import CanvasSizeModal from './components/CanvasSizeModal'
import PixelGrid from './components/PixelGrid'
import ColorPalette from './components/ColorPalette'
import Toolbar from './components/Toolbar'
import './App.css'

const AppContent: React.FC = () => {
  const { canvasSize, setCanvasSize } = usePixelArt()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [activeTool, setActiveTool] = useState('brush')

  const handleModalClose = (width: number, height: number) => {
    setCanvasSize({ width, height })
    setIsModalOpen(false)
  }

  return (
    <>
      <h1>Pixel Art Editor</h1>
      
      {canvasSize ? (
        <div className="editor-container">
          <div className="editor-sidebar">
            <Toolbar activeTool={activeTool} onToolChange={setActiveTool} />
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
