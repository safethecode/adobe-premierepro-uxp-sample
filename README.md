# Adobe UXP Premiere Pro Plugin

A boilerplate for Adobe UXP Premiere Pro plugin using React + TypeScript + Tailwind CSS + Spectrum CSS.

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Utility CSS Framework
- **Adobe Spectrum** - Adobe's Design System
- **Webpack** - Build Tool

## Project Structure

```
uxp/
├── src/
│   ├── components/       # React Components
│   ├── styles/          # Style Files
│   ├── types/           # TypeScript Type Definitions
│   ├── utils/           # Utility Functions
│   ├── App.tsx          # Main App Component
│   ├── index.tsx        # Entry Point
│   └── index.html       # HTML Template
├── icons/               # Plugin Icons
├── dist/                # Build Output (Generated)
├── manifest.json        # UXP Plugin Manifest
├── package.json
├── tsconfig.json
├── webpack.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Mode

```bash
pnpm run dev
```

This command watches for file changes and automatically rebuilds.

### 3. Production Build

```bash
pnpm run build
```

Built files will be generated in the `dist/` directory.

```
dist/
├── index.html        # Built HTML
├── index.js          # Bundled JavaScript
├── manifest.json     # Plugin Manifest
└── icons/            # Icon Files
```

## Loading Plugin into Adobe UXP

1. First, prepare icon files (optional):

   - Create `icons/icon.png` (23x23px)
   - Create `icons/icon@2x.png` (46x46px) (for retina)

2. Open Adobe UXP Developer Tool [(Download Guide)](https://developer.adobe.com/photoshop/uxp/2022/guides/devtool/installation/)

3. Click the "Add Plugin" button

4. Select the **`dist/manifest.json`** file from your project (after building)

5. Run Premiere Pro **Beta** and open the plugin panel

## Key Files Description

### `manifest.json`

Defines the metadata and permissions for the UXP plugin. Modify the plugin ID, name, and version as needed.

## Using Tailwind CSS and Spectrum CSS Together

This boilerplate is configured to use Tailwind CSS and Adobe Spectrum together:

- Tailwind's `preflight` is disabled to avoid conflicts with Spectrum CSS
- Both systems can be used in the same component

```tsx
<View className="rounded-lg shadow-lg">
  <Button variant="cta">Click me</Button>
</View>
```

## References

- [Adobe UXP Documentation](https://developer.adobe.com/photoshop/uxp/)
- [React Spectrum Documentation](https://react-spectrum.adobe.com/react-spectrum/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

MIT
