import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CanvasSize {
  width: number;
  height: number;
}

interface PixelData {
  [key: string]: string; // key format: "x,y" -> color
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
  };

  return (
    <PixelArtContext.Provider value={value}>
      {children}
    </PixelArtContext.Provider>
  );
};
