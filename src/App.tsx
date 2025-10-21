import { useState } from 'react'
import CanvasSizeModal from './components/CanvasSizeModal'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null)

  const handleModalClose = (width: number, height: number) => {
    setCanvasSize({ width, height })
    setIsModalOpen(false)
  }

  return (
    <>
      <h1>Pixel Art Editor</h1>
      
      {canvasSize ? (
        <div className="canvas-container">
          <p>Canvas created: {canvasSize.width} x {canvasSize.height} pixels</p>
          <p>Canvas will be rendered here in the next task!</p>
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

export default App
