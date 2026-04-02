# Smart Form Builder

A polished frontend prototype for designing forms visually, editing field settings, previewing the result, and reviewing UX quality signals in one workspace.

## Overview

Smart Form Builder is a single-page form design application built with [`React`](package.json), [`TypeScript`](package.json), [`Vite`](package.json), [`MUI`](package.json), [`Zustand`](package.json), and [`dnd-kit`](package.json). It focuses on a clean builder experience with drag-and-drop field management, a live preview, and a lightweight UX analysis panel.

This repository is ideal as:

- a frontend prototype for a larger form platform
- a UI foundation for internal tools
- a reference project for builder-style interfaces
- a starting point for advanced form generation workflows

---

## Features

- Visual form builder with draggable field cards
- Field palette for quickly adding new inputs
- Reordering inside the canvas with drag and drop
- Delete by dragging a field outside the canvas area
- Inspector panel for editing field properties
- Live preview mode for the generated form
- UX analysis panel with score and recommendations
- Responsive dashboard layout for builder, preview, and analysis workflows
- Clean component structure and centralized state management

---

## Product Screenshots

Add your screenshots to a folder such as [`docs/images/`](docs/images/) and replace the placeholder paths below.

### Builder Workspace

![Builder Workspace](docs/images/builder-workspace.png)

Suggested content:

- field palette on the left
- canvas in the center
- inspector on the right

### Drag and Drop Canvas

![Drag and Drop Canvas](docs/images/drag-and-drop-canvas.png)

Suggested content:

- dragging a field inside the canvas
- reordering cards
- deleting by dragging outside the canvas

### Live Preview

![Live Preview](docs/images/live-preview.png)

Suggested content:

- rendered form preview
- desktop or mobile viewport mode

### UX Analysis Panel

![UX Analysis Panel](docs/images/ux-analysis.png)

Suggested content:

- score cards
- warnings or recommendations
- analysis summary

### Inspector Panel

![Inspector Panel](docs/images/inspector-panel.png)

Suggested content:

- label editing
- placeholder/help text editing
- width and required toggles

---

## Tech Stack

- [`React`](package.json)
- [`TypeScript`](package.json)
- [`Vite`](package.json)
- [`MUI`](package.json)
- [`Zustand`](package.json)
- [`@dnd-kit/core`](package.json)
- [`@dnd-kit/sortable`](package.json)

---

## Project Structure

```text
src/
├── app/                # App shell and theme setup
├── components/
│   ├── analysis/       # UX analysis panels and score cards
│   ├── builder/        # Canvas, field cards, palette, drag-and-drop helpers
│   ├── inspector/      # Field settings editor
│   ├── preview/        # Live form preview
│   └── shared/         # Reusable UI building blocks
├── data/               # Mock templates and field catalog
├── store/              # Zustand state store
├── styles/             # Global styles
├── types/              # Shared TypeScript types
└── utils/              # Analysis and helper logic
```

Key files:

- [`src/app/App.tsx`](src/app/App.tsx) — main application shell and DnD orchestration
- [`src/components/builder/BuilderCanvas.tsx`](src/components/builder/BuilderCanvas.tsx) — central form canvas
- [`src/components/builder/BuilderFieldCard.tsx`](src/components/builder/BuilderFieldCard.tsx) — draggable field card UI
- [`src/components/inspector/InspectorPanel.tsx`](src/components/inspector/InspectorPanel.tsx) — field configuration panel
- [`src/components/preview/PreviewPanel.tsx`](src/components/preview/PreviewPanel.tsx) — live preview experience
- [`src/components/analysis/UxAnalysisPanel.tsx`](src/components/analysis/UxAnalysisPanel.tsx) — UX scoring and recommendations
- [`src/store/builderStore.ts`](src/store/builderStore.ts) — centralized builder state

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

Available scripts are defined in [`package.json`](package.json).

---

## How It Works

### 1. Add Fields

Use the field palette to insert new form elements into the canvas.

### 2. Reorder Fields

Drag cards within the canvas to change the form structure.

### 3. Delete Fields

Drag a card outside the central canvas area to remove it from the form.

### 4. Edit Properties

Select a field and update its label, placeholder, help text, width, and required state in the inspector.

### 5. Preview the Result

Switch to preview mode to see how the form looks as an end user would experience it.

### 6. Review UX Quality

Open the analysis view to inspect score cards and recommendations generated from the current form structure.

---

## Architecture Notes

The app follows a feature-oriented structure and keeps state centralized in [`builderStore.ts`](src/store/builderStore.ts). The UI is split into clear functional areas:

- **Builder** for structure and drag-and-drop editing
- **Inspector** for field configuration
- **Preview** for rendered output
- **Analysis** for UX feedback

This makes the project easy to extend with features such as:

- backend persistence
- template import/export
- validation rules
- multi-page forms
- collaboration features
- AI-assisted form suggestions

For a deeper architectural overview, see [`ARCHITECTURE.md`](ARCHITECTURE.md).

---

## Suggested Screenshot Folder

A practical structure for repository assets:

```text
docs/
└── images/
    ├── builder-workspace.png
    ├── drag-and-drop-canvas.png
    ├── live-preview.png
    ├── ux-analysis.png
    └── inspector-panel.png
```

---

## Roadmap Ideas

- Save and load custom form definitions
- Export forms as JSON schema or configuration
- Add validation rule editing
- Add multi-step form support
- Add undo/redo history
- Add keyboard accessibility improvements for drag-and-drop
- Add automated tests for builder interactions
- Add backend integration for persistence

---

## Development Notes

- The project currently uses mock data from [`src/data/mockForm.ts`](src/data/mockForm.ts) and [`src/data/mockAnalysis.ts`](src/data/mockAnalysis.ts).
- UX scoring logic is implemented in [`src/utils/analysis.ts`](src/utils/analysis.ts).
- Drag-and-drop helpers are located in [`src/components/builder/dnd.ts`](src/components/builder/dnd.ts).

---

## License

This project is licensed under the terms described in [`LICENSE`](LICENSE).

---

## Repository Description Suggestion

A modern React-based smart form builder with drag-and-drop editing, live preview, and UX analysis.
