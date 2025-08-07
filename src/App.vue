<template>
  <div id="app" :class="[{ rounded: style.rounded }, { dark: style.dark }]">
    <draggable
      v-model="blocks"
      :disabled="editable ? false : true"
      handle=".block__handle"
      class="grid"
      item-key="id"
    >
      <template #item="{ element: block, index }">
        <Block
          :globalEditable="editable"
          :styleRounded="style.rounded"
          :styleDark="style.dark"
          :block="block"
          :index="index"
          :key="block.id"
          @deleteBlock="deleteBlock"
          @updateBlocks="updateBlocks"
        />
      </template>
    </draggable>
    <button v-if="editable" class="block-preview">
      <span @click="addBlock" class="icon-wrapper">
        <font-awesome-icon icon="plus" class="icon" />
      </span>
    </button>
    <button @click="toggleEditable()" class="btn-settings">
      <span v-if="editable">Save</span>
      <span v-else>Edit</span>
      <font-awesome-icon v-if="editable" icon="check" class="icon" />
      <font-awesome-icon v-else icon="cogs" class="icon" />
    </button>
    <button
      v-if="editable"
      @click="toggleColored()"
      class="btn-settings btn-settings--2"
    >
      <span v-if="style.dark">Toggle Light Mode</span>
      <span v-else>Toggle Dark Mode</span>
      <font-awesome-icon icon="tint" class="icon" />
    </button>
    <button
      v-if="editable"
      @click="toggleRoundedCorners()"
      class="btn-settings btn-settings--3"
    >
      <span>Toggle Rounded Corners</span>
      <font-awesome-icon icon="square" class="icon" />
    </button>
    <footer v-if="editable" class="footer">
      <span>made by <a href="https://dreiqbik.de">dreiQBIK</a></span>
    </footer>
  </div>
</template>

<script>
import Block from "./components/Block.vue";
import draggable from "vuedraggable";

export default {
  name: "App",

  components: {
    Block,
    draggable,
  },

  data() {
    return {
      blocks: [],
      editable: false,
      style: {
        dark: false,
        rounded: true,
      },
    };
  },

  methods: {
    toggleEditable() {
      const self = this;
      self.editable = !self.editable;
    },

    async toggleRoundedCorners() {
      const self = this;
      self.style.rounded = !self.style.rounded;
      await self.saveToStorage({ style: self.style }, "style", self.style);
    },

    async toggleColored() {
      const self = this;
      self.style.dark = !self.style.dark;
      self.adjustBgColor();
      await self.saveToStorage({ style: self.style }, "style", self.style);
    },

    adjustBgColor() {
      const self = this;
      if (self.style.dark) {
        document.querySelector("body").style.backgroundColor = "#293847";
      } else {
        document.querySelector("body").style.backgroundColor = "#eaf0f6";
      }
    },

    addBlock() {
      const self = this;
      self.blocks.push({
        id: self.generateUniqueId(),
        blockEditable: true,
      });
    },

    deleteBlock(index) {
      const self = this;
      self.blocks.splice(index, 1);
    },

    async updateBlocks(blockData) {
      const self = this;
      self.blocks.forEach((item) => {
        if (item.id === blockData.id) {
          item.blockHeading = blockData.blockHeading;
          item.activeColor = blockData.activeColor;
          item.blockItems = blockData.blockItems;
          item.blockColors = blockData.blockColors;
          item.rowHeight = blockData.rowHeight;
        } else {
          item.blockEditable = false;
        }
      });
      await self.saveToStorage({ blocks: self.blocks }, "blocks", self.blocks);
    },

    async saveToStorage(object, stringName, value) {
      const self = this;
      try {
        // Check if we're in a Chrome extension context
        if (
          typeof chrome !== "undefined" &&
          chrome.storage &&
          chrome.storage.local
        ) {
          // Chrome storage is async - use Promise wrapper
          await new Promise((resolve, reject) => {
            chrome.storage.local.set(object, () => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                resolve();
              }
            });
          });
          console.log("Saved to chrome.storage:", object);
        } else {
          throw new Error("Chrome storage not available");
        }
      } catch (error) {
        console.log("Falling back to localStorage:", error.message);
        // localStorage is synchronous - no await needed
        localStorage.setItem(stringName, JSON.stringify(value));
      }
    },

    generateUniqueId() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },

    async getData() {
      const self = this;
      try {
        // Check if we're in a Chrome extension context
        if (
          typeof chrome !== "undefined" &&
          chrome.storage &&
          chrome.storage.local
        ) {
          // Chrome storage is async - use Promise wrapper
          const [blocksResult, styleResult] = await Promise.all([
            new Promise((resolve, reject) => {
              chrome.storage.local.get("blocks", (result) => {
                if (chrome.runtime.lastError) {
                  reject(new Error(chrome.runtime.lastError.message));
                } else {
                  resolve(result);
                }
              });
            }),
            new Promise((resolve, reject) => {
              chrome.storage.local.get("style", (result) => {
                if (chrome.runtime.lastError) {
                  reject(new Error(chrome.runtime.lastError.message));
                } else {
                  resolve(result);
                }
              });
            }),
          ]);

          if (blocksResult.blocks !== undefined && blocksResult.blocks.length) {
            self.blocks = blocksResult.blocks;
            console.log(
              "Loaded blocks from chrome.storage:",
              blocksResult.blocks
            );
          }

          if (styleResult.style !== undefined) {
            self.style = styleResult.style;
            console.log("Loaded style from chrome.storage:", styleResult.style);
          }
          self.adjustBgColor();
        } else {
          throw new Error("Chrome storage not available");
        }
      } catch (error) {
        console.log("Falling back to localStorage:", error.message);
        // localStorage is synchronous - no await needed
        if (localStorage.getItem("blocks")) {
          self.blocks = JSON.parse(localStorage.getItem("blocks"));
        }
        if (localStorage.getItem("style")) {
          self.style = JSON.parse(localStorage.getItem("style"));
        }
        self.adjustBgColor();
      }
    },
  },

  async created() {
    const self = this;
    await self.getData();
  },

  watch: {
    blocks: {
      async handler() {
        const self = this;
        console.log("blocks changed, saving...");
        await self.saveToStorage(
          { blocks: self.blocks },
          "blocks",
          self.blocks
        );
        if (self.blocks !== undefined && self.blocks.length === 0) {
          self.editable = true;
        }
      },
      deep: true,
    },
    editable: {
      async handler() {
        const self = this;
        console.log("editable changed, saving blocks...");
        await self.saveToStorage(
          { blocks: self.blocks },
          "blocks",
          self.blocks
        );
      },
    },
  },
};
</script>

<style lang="scss">
@use "sass:color";

// colors
$c-black: #293847;
$c1-grey: #d7dfe9;
$c2-grey: #eaf0f6;
$c-white: #fff;

$c1-main: #a1a9b3;
$c2-main: #427fb9;
$c1-second: #42b983;
$c1-third: #ee6161;
$c1-fourth: #ecd261;

// fonts
$f1-main: "Merriweather", "Times New Roman", serif;
$f1-second: "Open Sans", "Helvetica", Arial, sans-serif;

// breakpoints
@mixin b-small {
  @media (min-width: 765px) {
    @content;
  }
}
@mixin b-medium {
  @media (min-width: 1140px) {
    @content;
  }
}
@mixin b-large {
  @media (min-width: 1610px) {
    @content;
  }
}

html {
  font-size: 17px;
}

body {
  font-size: 1rem;
  margin: 0;
  background-color: $c2-grey;
}

*,
*:after,
*:before {
  box-sizing: border-box;
}

#app {
  font-family: $f1-second;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $c-black;
  // background-color: $c2-grey;
  padding: 2.5em 2em 4em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  animation: 0.2s fadein ease-in;

  @include b-large {
    max-width: 1660px;
  }

  &.dark {
    footer {
      color: color.adjust($c-black, $lightness: 5%);
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: minmax(350px, 1fr);
  grid-gap: 1em;

  @include b-small {
    grid-template-columns: repeat(2, minmax(340px, 1fr));
  }

  @include b-medium {
    grid-template-columns: repeat(3, minmax(340px, 1fr));
  }

  @include b-large {
    grid-template-columns: repeat(4, minmax(370px, 1fr));
  }
}

.block-preview {
  background-color: transparent;
  color: $c1-main;
  border: 0;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 2em;

  &:focus {
    outline: 0;
  }

  .icon-wrapper {
    background-color: $c1-main;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:focus {
      outline: 0;
      background-color: color.adjust($c1-main, $lightness: -10%);
    }

    &:hover {
      background-color: color.adjust($c1-main, $lightness: -5%);
    }
  }

  .icon {
    color: $c-white;
    width: 25px;
    height: 25px;
  }
}

.btn-settings {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: $c1-main;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;
  color: $c-white;
  cursor: pointer;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  animation: fadein 0.1s ease-in;

  &:focus {
    outline: 0;
    background-color: color.adjust($c1-main, $lightness: -10%);
  }

  &:hover {
    background-color: color.adjust($c1-main, $lightness: -5%);

    span {
      display: flex;
    }
  }

  .icon {
    width: 25px;
    height: 25px;
    max-width: 100%;
    max-height: 100%;
  }

  &--2,
  &--3 {
    width: 34px;
    height: 34px;
    right: 19px;

    .icon {
      width: 16px;
      height: 16px;
    }
  }

  &--2 {
    bottom: 70px;
  }

  &--3 {
    bottom: 115px;
  }

  span {
    display: none;
    align-items: center;
    background-color: $c1-main;
    color: $c-white;
    position: absolute;
    left: -1.5em;
    top: 0;
    bottom: 0;
    transform: translateX(-100%);
    font-family: $f1-second;
    font-weight: bold;
    padding: 0 2em;
    white-space: nowrap;
    box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.1);
    animation: slidein 0.1s ease-in;

    &:after {
      content: "";
      display: flex;
      flex-wrap: nowrap;
      position: absolute;
      right: -9px;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid $c1-main;
    }
  }
}

footer {
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  color: $c1-grey;
  font-family: $f1-second;
  font-weight: bold;

  a {
    color: inherit;
  }
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slidein {
  0% {
    opacity: 0;
    transform: translateX(-95%);
  }
  100% {
    opacity: 1;
    transform: translateX(-100%);
  }
}
</style>
