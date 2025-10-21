# Software Specification: Web Pixel Art Editor

## 1. Overview

### 1.1. Project Objective
The objective of this project is to create a lightweight and intuitive web application, similar to Microsoft Paint, specifically focused on creating *pixel art*. The application will allow users to draw on a pixel-based canvas, select colors, erase, and save their creations.

### 1.2. Technology Stack
* **Frontend:** React
* **Build Tool:** Vite
* **Language:** TypeScript

## 2. Functional Requirements

### 2.1. Canvas Setup

#### 2.1.1. Size Definition
* **Description:** When starting a new drawing (either upon first page load or by clicking "New Drawing"), a modal (pop-up) must be displayed.
* **Fields:** The modal must contain two numerical input fields:
    * `Width (pixels)`
    * `Height (pixels)`
* **Action:** Upon confirmation, the application must generate a grid canvas with the exact dimensions specified by the user.

#### 2.1.2. Grid
* **Description:** The canvas must display an optional grid that outlines each pixel.
* **Functionality:** There must be a button (e.g., "Toggle Grid") that allows the user to turn the grid visualization on or off at any time.

### 2.2. Toolbar

The toolbar must be always visible and contain the following items:

#### 2.2.1. Brush
* **Description:** The main tool for applying color to pixels.
* **Functionality:** When selected, clicking the mouse on a pixel on the canvas will apply the currently selected color. Holding the click and moving the mouse should allow for continuous drawing.

#### 2.2.2. Eraser
* **Description:** A tool to erase (remove color from) pixels.
* **Functionality:** When selected, clicking the mouse on a pixel will revert it to the background color (transparent or white).

#### 2.2.3. Size Selector (Brush/Eraser)
* **Description:** A feature to adjust the tip size of the brush and eraser.
* **Default:** The default size for both tools must be `1x1` pixel.
* **Functionality:** The user must have controls (e.g., "+" and "-" buttons or a slider) to increase or decrease the tool size (e.g., `2x2`, `3x3`, etc.).

#### 2.2.4. Color Palette
* **Description:** A common grid-style color palette displaying a selection of predefined colors.
* **Functionality:** Clicking on a color in the palette sets it as the active color, which will be used by the Brush.

#### 2.2.5. Color Picker (Eyedropper)
* **Description:** A tool to capture an existing color from the canvas.
* **Functionality:** Upon activating this tool, the user's next click on any pixel on the canvas will set that pixel's color as the new active color.

### 2.3. Actions and Utilities

#### 2.3.1. Clear Canvas (New Drawing)
* **Description:** A button (e.g., "Clear" or "New") that restarts the drawing process.
* **Functionality:** When clicked, this button must:
    1.  Present a confirmation warning if there is an unsaved drawing.
    2.  Upon confirmation, display the "Size Definition" modal (item 2.1.1) so the user can start a new art piece.

#### 2.3.2. Undo and Redo
* **Description:** Two buttons to manage the user's action history.
* **Functionality:**
    * **Undo:** Reverts the last drawing action (painting, erasing).
    * **Redo:** Re-applies the last action that was undone.
* **Scope:** The action history should be managed by strokes (from mouse down to mouse up), not by individual pixels.

#### 2.3.3. Zoom
* **Description:** Controls to zoom in or out on the drawing canvas.
* **Functionality:** "Zoom In" (+) and "Zoom Out" (-) buttons will allow the user to get closer or further from the canvas to facilitate detail editing.

### 2.4. File Management

#### 2.4.1. Save Art
* **Description:** A button (e.g., "Save" or "Export").
* **Functionality:** When clicked, the application must generate an image of the current art and prompt the browser to download it.
* **Format:** The exported file must be in `.jpeg` format.
* *(Suggestion for improvement: Also consider the `.png` format, which is more suitable for pixel art as it has no compression loss.)*

## 3. Non-Functional Requirements

* **Performance:** The application must efficiently handle reasonably sized canvases without noticeable lag when drawing.
* **Responsiveness:** Although the focus is *desktop* (given the Paint-like format), the toolbar and canvas should adjust in a usable way on different screen sizes.
* **Application State:** The canvas state (pixel colors), selected color, and action history must be managed centrally (e.g., via Context API or Redux/Zustand).
**Art:** The app should have a classic theme, creating a pixel art atmosphere to the user.


## 4. Tech Stack

- **Frontend Framework:** React (with Vite + TypeScript)
- **Data Storage:** Static JSON/TypeScript files (no backend)
- **State Management:** React `useState` / `useReducer`, optionally `useContext` or Zustand
- **Styling:** CSS Modules, TailwindCSS, or any preferred CSS strategy
- **Persistence:** Optional localStorage