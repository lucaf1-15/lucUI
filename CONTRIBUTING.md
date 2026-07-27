# Contributing to lucUI

Thank you for your interest in contributing to lucUI!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/lucui.git`
3. Navigate to the project: `cd lucui`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development

lucUI remains dependency-free in the browser, while its release bundles are generated from the modular source. Edit the modules directly, then rebuild before testing or submitting:

- **Core files:** `lucCORE/` - Design tokens, reset, typography, base styles
- **Components:** `lucCOMPONENTS/` - UI components (buttons, cards, navbar, etc.)
- **Utilities:** `lucUTILITIES/` - Utility classes (glass, animations, spacing, layout)
- **Source entry point:** `lucUI.source.css` - Ordered module manifest
- **Generated bundles:** `lucUI.css` and `lucUI.min.css` - Do not edit these by hand

```bash
npm run build
```

## Code Style

- Use 4 spaces for indentation
- Follow existing CSS naming conventions (luc- prefix)
- Maintain consistent formatting across files
- Add comments for complex styles

## Testing

Test your changes by:

1. Running `npm run build`
2. Including the generated `lucUI.css` in an HTML file
3. Using the classes you've modified
4. Testing dark, light, midnight, and sunrise themes
5. Testing keyboard navigation, reduced motion, and responsive layouts in Chrome, Safari, Firefox, and Edge

## Submitting Changes

1. Commit your changes: `git commit -m "Add your feature"`
2. Push to your fork: `git push origin feature/your-feature-name`
3. Create a Pull Request

## Guidelines

- Keep changes minimal and focused
- Follow the luca.ecosystem brand guidelines
- Ensure accessibility (focus states, reduced motion)
- Test responsive behavior
- Update documentation if needed
- Keep brand primitives stable; use semantic tokens for theme-specific color decisions

## Brand Guidelines

lucUI follows luca.ecosystem branding:

- **Colors:** Luca Navy (#1d2d44), Studio Gold (#ae9d5d), Designer's Azure (#00bbff), Luca Tangerine (#ff8c00), Bold Viridian (#00ff00)
- **Fonts:** Playfair Display (Black), Raleway (Medium), Montserrat (Light Italic)
- **Naming:** Use `luc-` prefix for all classes
- **Style:** Glass morphism, transparency effects, premium aesthetics

## Questions?

Open an issue on GitHub for questions or discussion.
