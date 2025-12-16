# GitHub Copilot Instructions

**Project:** Chrome Extension - New Tab Link Collection  
**Version:** 2.2.0  
**Status:** Production Ready

See full instructions at: `docs/QUICK_REFERENCE.md`

## Quick Facts
- Framework: Vue.js 3 (Options API)
- Build: Vite
- Storage: Chrome Storage API + localStorage fallback
- Save Pattern: Event-based (user clicks save button)
- No auto-save watchers!

## Key Files
- `src/services/storage.service.js` - All storage operations
- `src/constants/` - All configuration
- `docs/QUICK_REFERENCE.md` - Developer guide
- `docs/PRODUCTION_RELEASE.md` - Latest release

## Rules
❌ No console logs in production
❌ No auto-save watchers
❌ No magic strings (use constants)
❌ No direct prop mutation
✅ Always validate props
✅ Use StorageService for storage
✅ Keep components < 400 lines
✅ Event-based saving only
