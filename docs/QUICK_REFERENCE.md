# Quick Reference Guide 📖

**Last Updated:** 2025-12-16  
**Version:** 2.1.0 (Refactored)

---

## 🚀 Quick Start

### Development
```bash
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Build for production
```

### Load Extension in Chrome
1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `dist/` folder
5. Open a new tab to see your extension!

---

## 📁 Project Structure

```
src/
├── components/          # Vue Components
│   ├── Block.vue       # Block container (852 lines)
│   ├── BlockHeader.vue # Block header with colors (251 lines)
│   ├── BlockItem.vue   # Individual items (221 lines)
│   ├── BlockForm.vue   # Add item forms (243 lines)
│   └── Overlay.vue     # Icon picker (562 lines)
│
├── services/           # Business Logic Services
│   └── storage.service.js  # Chrome storage abstraction
│
├── constants/          # Configuration Constants
│   ├── storage-keys.js     # Storage key constants
│   ├── colors.js           # Color configuration
│   └── row-height.js       # Row height logic
│
├── utils/              # Utility Functions
│   └── uuid.js             # UUID generator
│
├── App.vue             # Main app component (280 lines)
└── main.js             # App entry point (166 lines)
```

---

## 🔑 Key Files

### Services

#### `storage.service.js`
**Purpose:** Centralized storage management

**Methods:**
```javascript
await StorageService.set(key, value)      // Save data
await StorageService.get(key)             // Get data
await StorageService.getMultiple([keys])  // Get multiple
await StorageService.remove(key)          // Remove data
await StorageService.clear()              // Clear all
```

**Usage:**
```javascript
import { StorageService } from './services/storage.service.js';
import { STORAGE_KEYS } from './constants/storage-keys.js';

// Save blocks
await StorageService.set(STORAGE_KEYS.BLOCKS, blocks);

// Load blocks
const blocks = await StorageService.get(STORAGE_KEYS.BLOCKS);
```

---

### Constants

#### `storage-keys.js`
```javascript
export const STORAGE_KEYS = {
  BLOCKS: "blocks",
  STYLE: "style",
};
```

#### `colors.js`
```javascript
export const BLOCK_COLORS = [
  { id: 1, name: "green", selected: true },
  { id: 2, name: "blue", selected: false },
  { id: 3, name: "yellow", selected: false },
  { id: 4, name: "red", selected: false },
];
```

#### `row-height.js`
```javascript
export function calculateRowHeight(itemCount) {
  if (itemCount < 10) return "1";
  if (itemCount < 20) return "2";
  return "3";
}
```

---

### Utilities

#### `uuid.js`
```javascript
export function generateUniqueId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(...);
}
```

---

## 🎨 Component Props & Events

### BlockHeader.vue

**Props:**
- `blockId: String` (required)
- `heading: String`
- `activeColor: String`
- `colors: Array` (required)
- `globalEditable: Boolean` (required)
- `blockEditable: Boolean` (required)
- `styleRounded: Boolean`
- `showIcons: Boolean`

**Events:**
- `@update:heading` - Heading text changed
- `@delete` - Delete button clicked
- `@color-change` - Color selected

---

### BlockItem.vue

**Props:**
- `item: Object` (required, validated)
- `isEditable: Boolean` (required)

**Events:**
- `@update` - Item data changed
- `@remove` - Delete clicked
- `@choose-icon` - Icon picker opened

---

### BlockForm.vue

**Props:**
- `blockId: String` (required)

**Events:**
- `@add-item` - Form submitted
- `@choose-icon` - Icon picker opened

**Methods:**
- `setIcon(iconName)` - Set icon for new item

---

## 🔄 Data Flow

```
User Action
    ↓
Component Event (@event)
    ↓
Parent Component Method
    ↓
Update State
    ↓
Watcher Triggers
    ↓
StorageService.set()
    ↓
Chrome Storage / localStorage
```

---

## 🎯 Common Tasks

### Add a New Icon
1. Import in `main.js`
2. Add to `library.add()` in `main.js`
3. Add to icons array in `Overlay.vue`

### Add a New Color
1. Edit `constants/colors.js`
2. Add CSS class in `BlockHeader.vue` styles
3. Color automatically available!

### Add a New Storage Key
1. Add to `constants/storage-keys.js`
2. Use via `STORAGE_KEYS.YOUR_KEY`

### Modify Row Height Logic
1. Edit `constants/row-height.js`
2. Update `calculateRowHeight()` function

---

## 🐛 Debugging

### Check Storage Contents
```javascript
// In Chrome DevTools Console
chrome.storage.local.get(null, (data) => console.log(data));
```

### Clear Storage
```javascript
// In Chrome DevTools Console
chrome.storage.local.clear(() => console.log('Cleared'));
```

### View localStorage (Dev Mode)
```javascript
// In Chrome DevTools Console
console.log(localStorage.getItem('blocks'));
console.log(localStorage.getItem('style'));
```

---

## 🧪 Testing Checklist

### Before Deploy
- [ ] `npm run build` completes without errors
- [ ] Extension loads in Chrome
- [ ] Can add/edit/delete blocks
- [ ] Drag-and-drop works
- [ ] Icon picker works
- [ ] Color picker works
- [ ] Data persists after refresh
- [ ] Dark mode toggle works
- [ ] Export data works

---

## 📊 Code Quality Metrics

| Metric | Score |
|--------|-------|
| **Overall Quality** | 7.5/10 |
| **Maintainability** | 8.5/10 |
| **Testability** | 8/10 |
| **Readability** | 9/10 |
| **Reusability** | 8/10 |

---

## 📚 Documentation Files

1. **CODE_ANALYSIS.md** - Comprehensive code analysis
2. **REFACTORING_COMPLETE.md** - Storage & constants refactoring
3. **COMPONENT_SPLIT_COMPLETE.md** - Component splitting details
4. **REFACTORING_SUMMARY.md** - Complete overview
5. **QUICK_REFERENCE.md** - This file

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Extension Not Loading
- Check Chrome → Extensions → Details → Errors
- Look for console errors in DevTools
- Verify manifest.json is valid

### Data Not Saving
- Check if Chrome storage permission is granted
- Check console for storage errors
- Try clearing storage and reload

---

## 💡 Best Practices

### When Adding Features
1. ✅ Use existing services (StorageService)
2. ✅ Add constants instead of magic strings
3. ✅ Keep components under 400 lines
4. ✅ Add props validation
5. ✅ Emit events instead of direct mutation

### When Modifying Code
1. ✅ Test after each change
2. ✅ Update documentation
3. ✅ Follow existing patterns
4. ✅ Keep methods small (<20 lines)
5. ✅ One responsibility per component

---

## 🔗 Useful Links

- **Chrome Extension Docs:** https://developer.chrome.com/docs/extensions/
- **Vue 3 Docs:** https://vuejs.org/
- **Vite Docs:** https://vitejs.dev/
- **FontAwesome Icons:** https://fontawesome.com/icons

---

## 🎯 Next Steps

### Immediate
- [ ] Test extension thoroughly
- [ ] Deploy to Chrome Web Store

### Short-term
- [ ] Extract icon constants
- [ ] Add unit tests
- [ ] Create base components

### Long-term
- [ ] Migrate to Composition API
- [ ] Add TypeScript
- [ ] Add state management (Pinia)

---

**Quick Tips:**
- 💡 Use `Ctrl+Shift+F` to search across all files
- 💡 Component files are in `src/components/`
- 💡 Services are in `src/services/`
- 💡 Constants are in `src/constants/`
- 💡 Always run `npm run build` before testing in Chrome

**Need Help?** Check the detailed documentation files! 📚
