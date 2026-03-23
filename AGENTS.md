# AGENTS.md - Development Guide for Hircost Certificate

This document provides essential information for agentic coding tools working in this repository.

## Build, Lint, and Test Commands

### npm scripts
- `npm start` - Start dev server (BrowserSync with hot reload)
- `npm run build` - Production build (minified, optimized)
- `npm run static` - Static site build with HTML minification
- `npm run final` - Run linters, then build
- `npm run lint` - Run both ESLint and Stylelint
- `npm run eslint` - Lint JavaScript only
- `npm run eslint -- --fix` - Auto-fix ESLint issues
- `npm run stylelint` - Lint SCSS only
- `npm run stylelint -- --fix` - Auto-fix Stylelint issues
- `npm run deploy` - Deploy to GitHub Pages (uses `npm run static`)

### Testing
**No test framework is configured.** To run tests, you must first:
1. Install a test framework (Jest, Vitest, or Mocha recommended)
2. Add test scripts to package.json
3. Use patterns like `npm test -- filename.test.js` for single tests

## Code Style Guidelines

### JavaScript
- **Module system**: ES6 modules (`import`/`export`)
- **Indentation**: 2 spaces (enforced by .editorconfig)
- **Quotes**: Single quotes (`'`) - enforced by ESLint
- **Semicolons**: Required - enforced by ESLint
- **Naming conventions**:
  - Variables/functions: `camelCase`
  - Classes: `PascalCase`
  - Constants: `UPPER_SNAKE_CASE` (true constants only)
  - Files: `kebab-case.js` (e.g., `validate.js`)
- **Import order**:
  1. External libraries (npm packages)
  2. Internal modules (relative paths)
  3. Side-effect imports last
- **Error handling**: Use try-catch for async operations; pass meaningful errors
- **Global objects**: Library globals declared in `.eslintrc` (lines 11-19)
- **Code style**: No alerts, limited console (warn/error only), no trailing spaces

### SCSS/CSS
- **Syntax**: SCSS (`.scss` files)
- **Indentation**: 2 spaces
- **Selector naming**: kebab-case, BEM methodology preferred (`block__element--modifier`)
- **Property order**: Group related properties; sort alphabetically within groups
- **Variables**:
  - CSS custom properties: `--var-name` in `:root` (see `_vars.scss`)
  - SCSS variables: `$variable-name` (for mixins, breakpoints)
- **Nesting**: Limit to 3 levels
- **Comments**: Use `//` for SCSS, `/* */` for CSS output
- **Color notation**: Long hex, legacy functions, number alpha notation

### HTML
- **Template includes**: Use `@include('html/path/file.html')` for partials
- **Formatting**: Auto-formatted by gulp-html-beautify during build
- **Attributes**: Double quotes, boolean attributes without values
- **Indentation**: 2 spaces
- **Self-closing**: Void elements don't need closing slash in HTML5

## Project Structure
```
src/
├── js/
│   ├── main.js                 # Entry point
│   └── modules/                # Feature modules
│       ├── modal.js
│       ├── slider.js
│       ├── utils.js
│       └── configs.js          # Configuration objects
├── style/
│   ├── _vars.scss              # CSS custom properties + SCSS vars
│   ├── _mixins.scss            # Reusable mixins
│   ├── _fonts.scss             # @font-face declarations
│   ├── settings/               # Global styles
│   ├── common/                 # Reusable components
│   ├── blocks/                 # Page-specific blocks
│   └── main.scss               # Entry point (8 imports)
├── html/
│   ├── head/                   # Head parts
│   ├── header/                 # Header parts
│   ├── footer/                 # Footer parts
│   ├── common/                 # Shared components
│   └── pages/                  # Page-specific templates
├── img/
│   ├── static/                 # Images processed by webpack
│   └── sprite/                 # SVG sprites (auto-generated)
└── vendor/                     # Third-party libraries
```

## Configuration Files
- **.eslintrc**: ESLint rules (extends eslint:recommended)
- **.stylelintrc.json**: Stylelint with standard-scss preset
- **.editorconfig**: Indentation (2 spaces), line endings (LF), UTF-8
- **gulpfile.js**: Build system using ES modules

## Import and Dependency Guidelines
- **JS**: Use named imports from npm packages when available
- **Vendor libraries**: Place sources in `src/vendor/` or import from npm
- **Global ESLint**: Add new global library instances to `.eslintrc` globals section
- **Circular dependencies**: Detected via `circular-dependency-plugin` in webpack

## Browser Support
Based on package.json browserslist: `defaults, last 1 versions, not IE 11`

## Key Conventions
- **DOM ready**: Wrap initialization in `DOMContentLoaded` (see `main.js:19`)
- **Window load**: Use for heavy operations after all resources load (see `main.js:22`)
- **Data attributes**: Use `data-*` for configuration and targeting
- **Event delegation**: Prefer when handling multiple dynamic elements
- **Debouncing**: Use `debounce` utility from `utils.js` for resize/scroll
- **Modals/sliders**: Initialize via wrapper functions in modules
- **State management**: Use reactive patterns where appropriate
- **Form validation**: Centralized in validate.js module

## Build Process Notes
- Webpack processes JS (Babel transpilation) and SCSS (Sass → CSS)
- Vendor JS concatenated separately, then merged with app JS
- Images: static → webpack asset module; others copied via gulp
- SVG sprites: Place in `src/img/sprite/`, auto-generated via gulp-svg-sprite
- CSS custom properties used for theming (already in `_vars.scss`)

## Performance Considerations
- Use CSS custom properties for theming
- Lazy load images where appropriate
- Debounce scroll/resize handlers
- Avoid heavy synchronous operations on main thread
- Focus-visible polyfill included for accessibility

## File Organization Best Practices
- Keep modules focused on single responsibility
- Group related styles in same directory
- Use index files for importing related modules
- Place configuration in separate config files
- Utility functions in dedicated utils module
