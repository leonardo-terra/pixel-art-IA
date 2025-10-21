# Pixel Art Editor 🎨

A modern, web-based pixel art editor built with React, TypeScript, and Vite. Create beautiful pixel art with an intuitive interface and powerful tools.

## Features

- 🖼️ **Canvas Creation**: Start with custom canvas dimensions
- 🎨 **Color Palette**: Choose from predefined colors or use the color picker
- 🖌️ **Brush Tool**: Paint pixels with different brush sizes
- 🧹 **Eraser Tool**: Remove pixels with precision
- 👁️ **Color Picker**: Sample colors from your artwork
- ↶ **Undo/Redo**: Never lose your progress
- 🔍 **Zoom Controls**: Work on fine details with zoom functionality
- 📁 **Export**: Save your artwork as JPEG files
- 📐 **Grid Toggle**: Show/hide pixel grid for better precision

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pixel-art-IA
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
pixel-art-IA/
├── docs/                    # Project documentation
│   ├── prompt.md           # Development guidelines
│   ├── specification.md    # Technical specifications
│   └── tasks.md            # Task breakdown and progress
├── public/                 # Static assets
│   └── vite.svg           # Vite logo
├── src/                   # Source code
│   ├── assets/            # React assets
│   │   └── react.svg      # React logo
│   ├── App.tsx            # Main application component
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite environment types
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # Node.js TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3
- **Package Manager**: npm

## Development

This project follows modern React development practices:

- **TypeScript** for type safety
- **Vite** for fast development and building
- **ESLint** for code quality
- **Hot Module Replacement (HMR)** for instant updates during development

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [package.json](package.json) file for details.

## Roadmap

- [x] **Phase 1**: Core Canvas Setup
  - [x] Basic React/Vite + TypeScript project
  - [ ] Canvas size modal
  - [ ] Pixel grid rendering
  - [ ] Basic color palette
  - [ ] Brush tool (1x1)

- [ ] **Phase 2**: Core Tools
  - [ ] Eraser tool
  - [ ] Color picker (eyedropper)
  - [ ] Clear canvas functionality
  - [ ] Grid toggle

- [ ] **Phase 3**: Advanced Features & Polish
  - [ ] Undo/Redo functionality
  - [ ] Brush/Eraser size selector
  - [ ] Zoom functionality
  - [ ] JPEG export

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

Made with ❤️ using React, TypeScript, and Vite
