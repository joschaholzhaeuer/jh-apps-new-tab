# Chrome Extension Modernization Guide

## Issues Found in Your Extension

### 1. **CRITICAL: Manifest V2 → V3 Migration**

- Your extension uses Manifest V2, which Google is phasing out
- **Deadline**: All Manifest V2 extensions will be removed from Chrome Web Store
- **Solution**: Updated to Manifest V3 (see `public/manifest.json`)

### 2. **Outdated Dependencies**

- Vue 2.5.2 → Vue 3.4.0
- node-sass → removed (incompatible with Node.js 22)
- webpack → Vite (modern, faster build tool)
- All dependencies from 2017-2018 → 2024-2025 versions

### 3. **Content Security Policy**

- Old: `'unsafe-eval'` allowed
- New: Stricter CSP without `'unsafe-eval'`
- **Impact**: Some dynamic code execution patterns need updating

### 4. **Build System**

- Old: Webpack 3 + complex configuration
- New: Vite with Chrome extension plugin

## Migration Steps

### Step 1: Backup Current Extension

```bash
# Your current working extension is in dist.crx
cp dist.crx backup-v1.0.crx
```

### Step 2: Update Dependencies

```bash
# Remove old dependencies and node_modules
rm -rf node_modules package-lock.json

# Use the new package.json
cp package-new.json package.json

# Install modern dependencies
npm install
```

### Step 3: Update Source Files

```bash
# Use updated main.js for Vue 3
cp src/main-new.js src/main.js

# Use updated index.html
cp index-new.html index.html
```

### Step 4: Update App.vue for Vue 3

The main App.vue file needs some updates for Vue 3 compatibility:

- Update icon components to use FontAwesome Vue 3
- Update draggable component syntax
- Check for Vue 3 breaking changes

### Step 5: Build and Test

```bash
# Build the extension
npm run build

# Test in Chrome
# 1. Go to chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select the 'dist' folder
```

## What's Updated

### New File Structure

```
├── public/
│   └── manifest.json (Manifest V3)
├── src/
│   ├── main.js (Vue 3)
│   └── App.vue (needs updating)
├── scripts/
│   └── prepare-extension.js
├── vite.config.js (modern build)
└── package.json (updated deps)
```

### Key Changes Made

1. **Manifest V3**: Updated permissions, CSP, and structure
2. **Vue 3**: Modern Vue with Composition API support
3. **Vite**: Fast build tool replacing Webpack
4. **FontAwesome**: Updated icon system
5. **ESModules**: Modern JavaScript modules

## Next Steps

1. **Test the current working extension** to understand its behavior
2. **Update App.vue** to be compatible with Vue 3 and new icon system
3. **Test thoroughly** before publishing
4. **Submit updated extension** to Chrome Web Store

## Chrome Web Store Requirements (2025)

- ✅ Manifest V3
- ✅ Modern CSP (no unsafe-eval)
- ✅ Updated dependencies
- ✅ Security best practices
- ⚠️ Need to test all functionality works

Your extension should now be compliant with current Chrome Web Store requirements!
