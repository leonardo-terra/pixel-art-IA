import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CanvasSize {
  width: number;
  height: number;
}

interface PixelData {
  [key: string]: string; // key format: "x,y" -> color
}

interface HistoryState {
  pixels: PixelData;
  timestamp: number;
}

interface Stroke {
  pixels: Array<{x: number, y: number, color: string}>;
  tool: string;
  timestamp: number;
}

interface PixelArtContextType {
  canvasSize: CanvasSize | null;
  setCanvasSize: (size: CanvasSize | null) => void;
  activeColor: string;
  setActiveColor: (color: string) => void;
  pixels: PixelData;
  setPixel: (x: number, y: number, color: string) => void;
  getPixel: (x: number, y: number) => string;
  clearCanvas: () => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  activeTool: string;
  setActiveTool: (tool: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  // Undo/Redo
  history: HistoryState[];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
  startStroke: () => void;
  addToStroke: (x: number, y: number, color: string) => void;
  endStroke: () => void;
}

const PixelArtContext = createContext<PixelArtContextType | undefined>(undefined);

export const usePixelArt = () => {
  const context = useContext(PixelArtContext);
  if (context === undefined) {
    throw new Error('usePixelArt must be used within a PixelArtProvider');
  }
  return context;
};

interface PixelArtProviderProps {
  children: ReactNode;
}

export const PixelArtProvider: React.FC<PixelArtProviderProps> = ({ children }) => {
  const [canvasSize, setCanvasSize] = useState<CanvasSize | null>(null);
  const [activeColor, setActiveColor] = useState<string>('#000000');
  const [pixels, setPixels] = useState<PixelData>({});
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [activeTool, setActiveTool] = useState<string>('brush');
  const [brushSize, setBrushSize] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  
  // History states
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  const setPixel = (x: number, y: number, color: string) => {
    const key = `${x},${y}`;
    setPixels(prev => ({
      ...prev,
      [key]: color
    }));
  };

  const getPixel = (x: number, y: number): string => {
    const key = `${x},${y}`;
    return pixels[key] || '#ffffff';
  };

  const clearCanvas = () => {
    setPixels({});
    saveToHistory();
  };

  // History management
  const saveToHistory = () => {
    const newState: HistoryState = {
      pixels: { ...pixels },
      timestamp: Date.now()
    };
    
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newState);
      return newHistory.slice(-50); // Keep only last 50 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setPixels({ ...history[newIndex].pixels });
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setPixels({ ...history[newIndex].pixels });
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Stroke management
  const startStroke = () => {
    setCurrentStroke({
      pixels: [],
      tool: activeTool,
      timestamp: Date.now()
    });
  };

  const addToStroke = (x: number, y: number, color: string) => {
    if (currentStroke) {
      setCurrentStroke(prev => prev ? {
        ...prev,
        pixels: [...prev.pixels, { x, y, color }]
      } : null);
    }
  };

  const endStroke = () => {
    if (currentStroke && currentStroke.pixels.length > 0) {
      saveToHistory();
    }
    setCurrentStroke(null);
  };

  const value: PixelArtContextType = {
    canvasSize,
    setCanvasSize,
    activeColor,
    setActiveColor,
    pixels,
    setPixel,
    getPixel,
    clearCanvas,
    showGrid,
    setShowGrid,
    activeTool,
    setActiveTool,
    brushSize,
    setBrushSize,
    zoomLevel,
    setZoomLevel,
    history,
    historyIndex,
    canUndo,
    canRedo,
    undo,
    redo,
    saveToHistory,
    startStroke,
    addToStroke,
    endStroke,
  };

  return (
    <PixelArtContext.Provider value={value}>
      {children}
    </PixelArtContext.Provider>
  );
};
