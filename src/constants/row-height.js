/**
 * Row Height Configuration
 * Thresholds for dynamic row height based on item count
 */

export const ROW_HEIGHT_THRESHOLDS = {
  SMALL: { max: 10, height: "1" },
  MEDIUM: { max: 20, height: "2" },
  LARGE: { max: Infinity, height: "3" },
};

/**
 * Calculate row height based on number of items
 * @param {number} itemCount - Number of items in block
 * @returns {string} Row height value
 */
export function calculateRowHeight(itemCount) {
  if (itemCount < ROW_HEIGHT_THRESHOLDS.SMALL.max) {
    return ROW_HEIGHT_THRESHOLDS.SMALL.height;
  } else if (itemCount < ROW_HEIGHT_THRESHOLDS.MEDIUM.max) {
    return ROW_HEIGHT_THRESHOLDS.MEDIUM.height;
  } else {
    return ROW_HEIGHT_THRESHOLDS.LARGE.height;
  }
}
