# Contribution Guide - LE SCRIPT

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## Development Setup

```bash
# Clone
git clone https://github.com/yourusername/le-script.git
cd le-script

# Install
bash setup.sh

# Start development
cd backend && npm run start:dev  # Terminal 1
cd frontend && npm run dev       # Terminal 2
```

## Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format with Prettier
- Write tests for new features

## Commit Messages

Use conventional commits:
- `feat: Add new feature`
- `fix: Fix bug`
- `docs: Update documentation`
- `style: Format code`
- `refactor: Refactor code`
- `test: Add tests`
- `chore: Update dependencies`

## Testing

```bash
# Backend tests
cd backend && npm run test

# Backend coverage
cd backend && npm run test:cov
```

## PR Requirements

- Clear description of changes
- Reference related issues
- Tests for new features
- Updated documentation
- No merge conflicts

## Issues

- Search before opening
- Provide reproduction steps
- Include error logs/screenshots
- Specify versions used

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🎵✨**