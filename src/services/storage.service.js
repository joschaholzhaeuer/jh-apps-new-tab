/**
 * Storage Service
 * Handles Chrome storage API with localStorage fallback
 * Single source of truth for all storage operations
 */

export class StorageService {
  /**
   * Save data to storage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {Promise<void>}
   */
  static async set(key, value) {
    try {
      // Check if we're in a Chrome extension context
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.local
      ) {
        // Chrome storage is async - use Promise wrapper
        await new Promise((resolve, reject) => {
          chrome.storage.local.set({ [key]: value }, () => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve();
            }
          });
        });
      } else {
        throw new Error("Chrome storage not available");
      }
    } catch (error) {
      // Fallback to localStorage in development mode
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Get data from storage
   * @param {string} key - Storage key
   * @returns {Promise<*>} Retrieved value or undefined
   */
  static async get(key) {
    try {
      // Check if we're in a Chrome extension context
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.local
      ) {
        // Chrome storage is async - use Promise wrapper
        const result = await new Promise((resolve, reject) => {
          chrome.storage.local.get(key, (result) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(result);
            }
          });
        });
        return result[key];
      } else {
        throw new Error("Chrome storage not available");
      }
    } catch (error) {
      // Fallback to localStorage in development mode
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    }
  }

  /**
   * Get multiple keys from storage
   * @param {string[]} keys - Array of storage keys
   * @returns {Promise<Object>} Object with key-value pairs
   */
  static async getMultiple(keys) {
    try {
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.local
      ) {
        const result = await new Promise((resolve, reject) => {
          chrome.storage.local.get(keys, (result) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(result);
            }
          });
        });
        return result;
      } else {
        throw new Error("Chrome storage not available");
      }
    } catch (error) {
      // Fallback to localStorage in development mode
      const result = {};
      keys.forEach((key) => {
        const item = localStorage.getItem(key);
        if (item) {
          result[key] = JSON.parse(item);
        }
      });
      return result;
    }
  }

  /**
   * Remove data from storage
   * @param {string} key - Storage key
   * @returns {Promise<void>}
   */
  static async remove(key) {
    try {
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.local
      ) {
        await new Promise((resolve, reject) => {
          chrome.storage.local.remove(key, () => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve();
            }
          });
        });
      } else {
        throw new Error("Chrome storage not available");
      }
    } catch (error) {
      // Fallback to localStorage in development mode
      localStorage.removeItem(key);
    }
  }

  /**
   * Clear all storage data
   * @returns {Promise<void>}
   */
  static async clear() {
    try {
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.local
      ) {
        await new Promise((resolve, reject) => {
          chrome.storage.local.clear(() => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve();
            }
          });
        });
      } else {
        throw new Error("Chrome storage not available");
      }
    } catch (error) {
      // Fallback to localStorage in development mode
      localStorage.clear();
    }
  }
}
