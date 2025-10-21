# TODO List: Pixel Art Editor Implementation

## Phase 1: Core Canvas Setup 🎨

- [x] **Task: 1.1. Create Basic React/Vite + TS Project**
    - **Acceptance Criteria (AC):**
        - [x] The project is initialized with `Vite` using the `React` and `TypeScript` template.
        - [x] The project runs locally (`npm run dev`) and displays the default splash page.

- [x] **Task: 1.1.2. Create README.md Documentation**
    - **Acceptance Criteria (AC):**
        - [x] A comprehensive README.md file is created in the project root.
        - [x] The README includes project description, features, installation instructions, and usage guide.
        - [x] The README includes technology stack information and project structure.
        - [x] The README includes development guidelines and contribution instructions.

- [ ] **Task: 1.2. Implement Canvas Size Modal**
    - **AC:**
        - [ ] On page load, a modal (pop-up) appears.
        - [ ] The modal contains two numeric input fields: "Width" and "Height".
        - [ ] There is a "Create" or "Start" button.
        - [ ] Clicking "Create" closes the modal.

- [ ] **Task: 1.3. Render the Pixel Grid (Canvas)**
    - **AC:**
        - [ ] After the modal closes, a grid is rendered on the screen.
        - [ ] The grid consists of `divs` (or `<canvas>` elements) with the exact `Width` x `Height` dimensions provided by the user.
        - [ ] Each "pixel" (grid cell) is clearly visible with a border.

- [ ] **Task: 1.4. Implement Basic Color Palette**
    - **AC:**
        - [ ] A palette component is visible on the screen.
        - [ ] The palette displays at least 5 predefined colors (e.g., black, red, green, blue, white).
        - [ ] Clicking a color stores it in the global state (Context API or Zustand/Redux) as the "active color."
        - [ ] The selected color is visually highlighted in the palette.

- [ ] **Task: 1.5. Implement Brush Tool (1x1)**
    - **AC:**
        - [ ] The "Brush" tool is the default active tool.
        - [ ] Clicking on a pixel in the grid changes that pixel's background color to the "active color."
        - [ ] Clicking and dragging the mouse over the grid continuously paints all pixels the mouse passes over.
        - [ ] The brush size is strictly `1x1` pixel.

---

## Phase 2: Core Tools 🖌️

- [ ] **Task: 2.1. Implement Eraser Tool (1x1)**
    - **AC:**
        - [ ] There is an "Eraser" button in the toolbar.
        - [ ] Clicking it activates the eraser tool (and deactivates the brush).
        - [ ] Clicking on a painted pixel reverts it to the background color (e.g., white or transparent).
        - [ ] Clicking and dragging with the eraser continuously erases.

- [ ] **Task: 2.2. Implement Color Picker (Eyedropper)**
    - **AC:**
        - [ ] There is a "Color Picker" button in the toolbar.
        - [ ] Clicking it activates the tool.
        - [ ] The mouse cursor changes to an "eyedropper" icon.
        - [ ] Clicking on any pixel in the grid (painted or not) sets that pixel's color as the new "active color" in the palette.
        - [ ] After the click, the active tool automatically reverts to the "Brush."

- [ ] **Task: 2.3. Implement "Clear Canvas" Button**
    - **AC:**
        - [ ] There is a "New" or "Clear" button in the toolbar.
        - [ ] Clicking this button displays a confirmation modal ("Are you sure? Unsaved progress will be lost.").
        - [ ] If the user confirms, the "Canvas Size" modal (Task 1.2) is displayed to start a new drawing.

- [ ] **Task: 2.4. Implement Grid Toggle**
    - **AC:**
        - [ ] There is a "Toggle Grid" button or checkbox.
        - [ ] By default, the grid (pixel borders) is visible.
        - [ ] Clicking the button hides the borders of all pixels.
        - [ ] Clicking it again re-displays the borders.

---

## Phase 3: Advanced Features & Polish ✨

- [ ] **Task: 3.1. Implement Undo/Redo**
    - **AC:**
        - [ ] "Undo" and "Redo" buttons exist.
        - [ ] Each "stroke" (action from "mouse down" to "mouse up" with Brush or Eraser) is saved to history.
        - [ ] Clicking "Undo" reverts the last paint/erase action on the canvas.
        - [ ] Clicking "Redo" re-applies an action that was undone.
        - [ ] The buttons are disabled if there is no action to undo/redo.

- [ ] **Task: 3.2. Implement Brush/Eraser Size Selector**
    - **AC:**
        - [ ] Controls (e.g., "+" and "-" buttons) for "Tool Size" exist.
        - [ ] The default size is `1x1`.
        - [ ] Increasing the size (e.g., to `2x2`) makes the Brush/Eraser affect a 2x2 pixel area centered on the cursor.
        - [ ] The tool size state is maintained when switching between Brush and Eraser.

- [ ] **Task: 3.3. Implement Zoom Functionality**
    - **AC:**
        - [ ] "Zoom In" (+) and "Zoom Out" (-) buttons exist.
        - [ ] Clicking "Zoom In" increases the visual size of the grid (e.g., each `10x10px` pixel becomes `12x12px`).
        - [ ] Clicking "Zoom Out" decreases the visual size.
        - [ ] The canvas area is scrollable if it becomes larger than the viewport.

- [ ] **Task: 3.4. Implement .jpeg Export**
    - **AC:**
        - [ ] There is a "Save" or "Export" button.
        - [ ] Clicking the button converts the current state of the grid (the `divs` and their colors) into an image. (Note: This will likely require drawing to an actual `<canvas>` element and then using `toDataURL('image/jpeg')`).
        - [ ] The browser initiates a download of a `.jpeg` file with the artwork.
        - [ ] The exported image has the exact pixel dimensions (e.g., `32x32`), not the zoomed visual size.