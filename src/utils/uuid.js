/**
 * UUID Generation Utility
 * Generates RFC4122 version 4 compliant unique identifiers
 */

/**
 * Generate a unique ID
 * @returns {string} UUID v4 string
 */
export function generateUniqueId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
