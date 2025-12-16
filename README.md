# New Tab Link Collection 🔖

A beautiful, modern Chrome extension that replaces your new tab page with customizable link collections. Built with Vue.js 3.

**Version:** 2.2.0
**Status:** ✅ Production Ready
**Last Updated:** 2025-12-16

---

## ✨ Features

- 📦 **Customizable Link Blocks** - Organize links into colored blocks
- 🎨 **Multiple Themes** - Dark mode, light mode, rounded corners
- 🎯 **Drag & Drop** - Reorder links and blocks easily
- 🎨 **70+ Icons** - FontAwesome icons for every link
- 💾 **Auto-Persist** - Data saved in Chrome storage
- 📤 **Export/Import** - Backup and restore your data

---

## 🚀 Quick Start

### Development

```bash
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
```

### Production Build

```bash
npm run build       # Build to dist/ folder
```

### Install Extension

1. Build the extension: `npm run build`
2. Open Chrome → `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `dist/` folder

---

## 📁 Project Structure

```
chrome-extension-new-tab/
├── src/                 # Source code
│   ├── components/      # Vue components
│   ├── services/        # Business logic
│   ├── constants/       # Configuration
│   └── utils/           # Utilities
├── docs/                # Documentation
├── releases/            # Built packages
└── public/              # Static assets
```

---

## 📚 Documentation

- **[Quick Reference](docs/QUICK_REFERENCE.md)** - Developer guide
- **[Production Release](docs/PRODUCTION_RELEASE.md)** - Latest release notes
- **[Copilot Instructions](.github/copilot-instructions.md)** - AI assistant guide

---

## 🛠️ Tech Stack

- Vue.js 3 (Options API)
- Vite
- SCSS
- FontAwesome
- Chrome Storage API

---

**Built with ❤️ using Vue.js and Vite**
