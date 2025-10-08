# Contributing to Pterodactyl Advanced Themes

Thank you for your interest in contributing to the Pterodactyl Advanced Themes project! We welcome contributions from the community and appreciate your help in making these themes even better.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm 8+
- Git
- A Pterodactyl Panel installation for testing
- Basic knowledge of CSS and HTML

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/pterodactyl-advanced-themes.git
   cd pterodactyl-advanced-themes
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up your development environment**:
   ```bash
   npm run watch
   ```

## 🎨 Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Follow CSS best practices
- Comment complex CSS rules
- Use semantic class names
- Maintain responsive design principles

### File Structure

```
themes/
├── advanced-dark/
│   ├── theme.css          # Main theme styles
│   ├── overrides.css      # Pterodactyl-specific overrides
│   └── theme.json         # Theme configuration
├── advanced-light/
│   ├── theme.css          # Main theme styles
│   ├── overrides.css      # Pterodactyl-specific overrides
│   └── theme.json         # Theme configuration
scripts/
├── install.js             # Installation script
└── uninstall.js           # Uninstallation script
```

### CSS Guidelines

1. **Use CSS Custom Properties (Variables)**:
   ```css
   :root {
     --primary-color: #6366f1;
     --bg-primary: #0f0f23;
   }
   ```

2. **Follow BEM Methodology** for class naming:
   ```css
   .card {}
   .card__header {}
   .card__body {}
   .card--featured {}
   ```

3. **Use Mobile-First Responsive Design**:
   ```css
   /* Mobile styles first */
   .component { /* mobile styles */ }
   
   /* Tablet and up */
   @media (min-width: 768px) {
     .component { /* tablet styles */ }
   }
   
   /* Desktop and up */
   @media (min-width: 1024px) {
     .component { /* desktop styles */ }
   }
   ```

4. **Include Accessibility Features**:
   - Proper color contrast ratios
   - Focus states for keyboard navigation
   - Screen reader friendly markup

## 🐛 Reporting Issues

### Before Reporting

1. **Check existing issues** to avoid duplicates
2. **Test with the latest version** of the themes
3. **Clear your browser cache** and test again
4. **Try different browsers** to isolate the issue

### Issue Template

When reporting an issue, please include:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g. Chrome 90, Firefox 88]
- Pterodactyl Version: [e.g. 1.11.0]
- Theme: [e.g. Advanced Dark]
- OS: [e.g. Ubuntu 20.04, Windows 10]

**Additional context**
Any other context about the problem.
```

## 🔧 Making Changes

### Branch Naming

Use descriptive branch names:
- `feature/new-color-scheme`
- `fix/mobile-navigation`
- `enhancement/button-animations`
- `docs/installation-guide`

### Commit Messages

Follow conventional commit format:

```
type(scope): description

feat(theme): add new color scheme option
fix(dark): resolve mobile navigation issue
docs(readme): update installation instructions
style(buttons): improve hover animations
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the guidelines
3. **Test thoroughly** on different browsers and devices
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile devices
- [ ] Tested with both themes

## Screenshots
If applicable, add screenshots of your changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly marked)
```

## 🎨 Theme Development

### Adding New Themes

1. **Create theme directory**:
   ```bash
   mkdir themes/new-theme-name
   ```

2. **Copy base files** from existing theme
3. **Customize colors and styles**
4. **Update theme.json** with new information
5. **Test thoroughly** before submitting

### Color Scheme Guidelines

- **Maintain accessibility** with proper contrast ratios
- **Use semantic color names** (primary, secondary, success, etc.)
- **Provide both light and dark variants** when possible
- **Test with colorblind users** in mind

### Animation Guidelines

- **Keep animations subtle** and purposeful
- **Respect user preferences** (prefers-reduced-motion)
- **Use appropriate durations** (200-300ms for most interactions)
- **Provide fallbacks** for older browsers

## 📝 Documentation

### Updating Documentation

- **Keep README.md current** with new features
- **Add installation notes** for new requirements
- **Update troubleshooting** section with common issues
- **Include screenshots** for visual changes

### Code Comments

- **Comment complex CSS** logic
- **Explain browser-specific** workarounds
- **Document custom properties** and their usage
- **Include examples** for reusable components

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Desktop browsers**: Chrome, Firefox, Safari, Edge
- [ ] **Mobile devices**: iOS Safari, Android Chrome
- [ ] **Tablet devices**: iPad, Android tablets
- [ ] **Different screen sizes**: 320px to 4K
- [ ] **Accessibility**: Keyboard navigation, screen readers
- [ ] **Performance**: Page load times, animation smoothness

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Release Process

### Version Numbering

Follow semantic versioning (SemVer):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] **Update version numbers** in all relevant files
- [ ] **Test installation scripts** on different systems
- [ ] **Update changelog** with new features and fixes
- [ ] **Create release notes** for GitHub release
- [ ] **Tag the release** with version number

## 💬 Community Guidelines

### Code of Conduct

- **Be respectful** and inclusive
- **Provide constructive feedback**
- **Help others** learn and grow
- **Follow GitHub's community guidelines**

### Getting Help

- **Check documentation** first
- **Search existing issues** before creating new ones
- **Ask questions** in GitHub Discussions
- **Be specific** about your problem

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes for significant contributions

Thank you for contributing to make Pterodactyl Panel themes better! 🎉
