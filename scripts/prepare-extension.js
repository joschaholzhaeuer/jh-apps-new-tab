import fs from "fs/promises";
import path from "path";

async function prepareExtension() {
  // Copy icons to the correct location
  const iconsSource = "src/assets";
  const iconsDest = "dist/icons";

  try {
    await fs.mkdir(iconsDest, { recursive: true });

    // Copy icon files
    const iconFiles = ["icon16.png", "icon48.png", "icon128.png"];
    for (const icon of iconFiles) {
      try {
        await fs.copyFile(
          path.join(iconsSource, icon),
          path.join(iconsDest, icon)
        );
        console.log(`Copied ${icon}`);
      } catch (err) {
        console.warn(`Could not copy ${icon}:`, err.message);
      }
    }

    console.log("Extension preparation complete!");
  } catch (err) {
    console.error("Error preparing extension:", err);
  }
}

prepareExtension();
