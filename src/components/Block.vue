<template>
  <div
    :class="[
      { isGlobalEditable: globalEditable },
      { isEditable: blockEditable },
      { rounded: styleRounded },
      { dark: styleDark },
      'span-' + rowHeight,
    ]"
    class="block"
  >
    <BlockHeader
      :block-id="id"
      :heading="blockHeading"
      :active-color="activeColor"
      :colors="blockColors"
      :global-editable="globalEditable"
      :block-editable="blockEditable"
      :style-rounded="styleRounded"
      :show-icons="showIcons"
      @update:heading="updateHeading"
      @delete="$emit('deleteBlock', index)"
      @color-change="changeColor"
    />
    <div class="block__content">
      <ul>
        <draggable
          v-model="blockItems"
          v-if="blockItems.length"
          @add="handleDragUpdate"
          @remove="handleDragUpdate"
          @end="handleDragUpdate"
          group="blockList"
          :disabled="globalEditable && blockEditable ? false : true"
          handle=".handle"
          item-key="id"
        >
          <template #item="{ element: item }">
            <BlockItem
              :item="item"
              :is-editable="globalEditable && blockEditable"
              @update="handleItemUpdate"
              @remove="removeItem"
              @choose-icon="chooseIcon"
            />
          </template>
        </draggable>
        <p v-else>
          No links saved yet. Start adding your favorite links and websites!
        </p>
      </ul>
      
      <BlockForm
        v-if="globalEditable && blockEditable"
        ref="blockForm"
        :block-id="id"
        @add-item="handleAddItem"
        @choose-icon="chooseIcon"
      />
    </div>
    <span
      v-if="globalEditable && !blockEditable && !showIcons"
      @click="blockEditable = true"
      :class="activeColor"
      class="icon-wrapper icon-wrapper--edit"
    >
      <font-awesome-icon icon="edit" class="icon" />
    </span>
    <span
      v-if="globalEditable && blockEditable && !showIcons"
      @click="saveBlockChanges"
      :class="activeColor"
      class="icon-wrapper icon-wrapper--edit"
    >
      <font-awesome-icon icon="check" class="icon" />
    </span>
    <Overlay
      v-if="globalEditable && blockEditable && showIcons"
      :activeColor="activeColor"
      :styleRounded="styleRounded"
      :styleDark="styleDark"
      :currentIcon="currentIcon"
      :selectedItemId="selectedItemId"
      @setIcon="setIcon"
    >
    </Overlay>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Overlay from "./Overlay.vue";
import BlockHeader from "./BlockHeader.vue";
import BlockItem from "./BlockItem.vue";
import BlockForm from "./BlockForm.vue";
import { StorageService } from "../services/storage.service.js";
import { STORAGE_KEYS } from "../constants/storage-keys.js";
import { BLOCK_COLORS } from "../constants/colors.js";
import { calculateRowHeight } from "../constants/row-height.js";
import { generateUniqueId } from "../utils/uuid.js";

export default {
  name: "Block",

  components: {
    draggable,
    Overlay,
    BlockHeader,
    BlockItem,
    BlockForm,
  },

  props: {
    globalEditable: {
      type: Boolean,
      required: true,
    },
    styleRounded: {
      type: Boolean,
      default: true,
    },
    styleDark: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Object,
      required: true,
      validator: (value) => value.id !== undefined,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      id: this.block.id,
      blockEditable: this.block.blockEditable,
      blockHeading: "",
      activeColor: "green",
      blockItems: [],
      blockColors: JSON.parse(JSON.stringify(BLOCK_COLORS)), // Deep copy to avoid mutation
      showIcons: false,
      currentIcon: "tag",
      selectedItemId: "",
      rowHeight: "1",
    };
  },

  methods: {
    handleAddItem(itemData) {
      const newItem = {
        id: generateUniqueId(),
        type: itemData.type,
        name: itemData.name,
      };

      if (itemData.type === "link") {
        newItem.icon = itemData.icon || "tag";
        newItem.link = itemData.link;
      }

      this.blockItems.push(newItem);
      this.adjustRowHeight();
      // Notify parent so changes are included when "Save" is clicked
      this.triggerDataUpdate();
    },

    saveBlockChanges() {
      this.blockEditable = false;
      this.triggerDataUpdate();
    },

    updateHeading(newHeading) {
      this.blockHeading = newHeading;
      // Notify parent so changes are included when "Save" is clicked
      this.triggerDataUpdate();
    },

    handleItemUpdate() {
      // Item was updated (text changed)
      // Notify parent so changes are included when "Save" is clicked
      this.triggerDataUpdate();
    },

    handleDragUpdate() {
      // When items are dragged, update order
      this.adjustRowHeight();
      // Notify parent of changes so they're included when "Save" is clicked
      this.triggerDataUpdate();
    },

    removeItem(idToRemove) {
      this.blockItems = this.blockItems.filter(
        (item) => item.id !== idToRemove
      );
      this.adjustRowHeight();
      // Notify parent so changes are included when "Save" is clicked
      this.triggerDataUpdate();
    },

    adjustRowHeight() {
      this.rowHeight = calculateRowHeight(this.blockItems.length);
    },

    changeColor(colorId) {
      // Deselect all colors
      this.blockColors.forEach((color) => (color.selected = false));

      // Select clicked color
      const selectedColor = this.blockColors.find(
        (color) => color.id === colorId
      );
      if (selectedColor) {
        selectedColor.selected = true;
        this.activeColor = selectedColor.name;
        // Notify parent so changes are included when "Save" is clicked
        this.triggerDataUpdate();
      }
    },

    chooseIcon(iconName, itemIdToChange) {
      this.showIcons = true;
      this.selectedItemId = itemIdToChange;
      this.currentIcon = iconName || "tag";
    },

    setIcon(iconName, itemIdToChange) {
      this.showIcons = false;
      if (itemIdToChange === "") {
        // Set icon for new item in form
        if (this.$refs.blockForm) {
          this.$refs.blockForm.setIcon(iconName);
        }
      } else {
        // Set icon for existing item
        const targetItem = this.blockItems.find(
          (item) => item.id === itemIdToChange
        );
        if (targetItem) {
          targetItem.icon = iconName;
          // Notify parent so changes are included when "Save" is clicked
          this.triggerDataUpdate();
        }
      }
    },

    triggerDataUpdate() {
      this.$emit("updateBlocks", this.$data);
    },

    async getData() {
      try {
        const blocks = await StorageService.get(STORAGE_KEYS.BLOCKS);

        if (blocks && blocks.length) {
          const blockData = blocks.find((item) => item.id === this.id);

          if (blockData) {
            this.blockHeading = blockData.blockHeading || this.blockHeading;
            this.activeColor = blockData.activeColor || this.activeColor;
            this.blockColors = blockData.blockColors || this.blockColors;
            this.blockItems = blockData.blockItems || this.blockItems;
            this.rowHeight = blockData.rowHeight || this.rowHeight;
            this.blockEditable = blockData.blockEditable || this.blockEditable;
          }
        }
      } catch (error) {
        // Silent fail - use default values
      }
    },
  },

  async created() {
    await this.getData();
    
    // If this is a new block (no stored data), initialize parent with default state
    if (!this.blockHeading && this.blockItems.length === 0) {
      this.$nextTick(() => {
        this.triggerDataUpdate();
      });
    }
  },

  watch: {
    globalEditable() {
      if (!this.globalEditable) {
        // When exiting edit mode, close this block's edit mode and save
        this.blockEditable = false;
        this.triggerDataUpdate();
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
$f1-second: "Open Sans", "Helvetica", sans-serif;

h1,
h2,
h3 {
  margin: 0;
  font-weight: bold;
}

.block {
  background-color: $c-white;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.1);
  animation: fadein 0.1s ease-in;
  display: flex;
  flex-direction: column;
  position: relative;

  &.rounded {
    border-radius: 10px;

    .block__header {
      border-radius: 10px 10px 0 0;
    }

    form {
      border-radius: 0 10px 10px 10px;

      input,
      .btn {
        border-radius: 5px;
      }
    }

    .tab__item {
      border-radius: 5px 5px 0 0;
    }
  }

  &.dark {
    background-color: color.adjust($c-black, $lightness: -5%);

    .tab__item {
      border-color: $c-black;

      &.is-active {
        background-color: $c-black;
      }
    }

    .icon-wrapper--light {
      background-color: $c-black;
    }

    .section__input {
      border-color: $c-black;
    }

    .color {
      border-color: color.adjust($c-black, $lightness: -5%);
    }

    .link,
    .icon--indicator,
    h3 {
      color: $c1-grey;
    }

    form {
      background-color: $c-black;

      input {
        color: $c1-main;
        background-color: color.adjust($c-black, $lightness: -5%);
        border-color: color.adjust($c-black, $lightness: 5%);

        &::placeholder {
          color: color.adjust($c-black, $lightness: 5%);
        }
      }

      input[type="submit"] {
        background-color: $c1-main;
        color: $c-white;
      }
    }
  }

  &.isEditable {
    min-height: 450px;
  }

  &.isGlobalEditable {
    margin-bottom: 1.5em;

    .block__handle {
      cursor: move;
    }
  }

  &.span-1 {
    grid-row: span 1;
  }

  &.span-2 {
    grid-row: span 2;
  }

  &.span-3 {
    grid-row: span 3;
  }

  &__content {
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;

    ul {
      flex-grow: 1;
    }

    li {
      &:last-child {
        padding-bottom: 0;
      }
    }

    p {
      color: $c1-grey;
      text-align: center;
    }
  }

  &__header {
    position: relative;
    color: $c-white;
    padding: 1.3em 1.5em;
    display: flex;

    &.green {
      background-color: $c1-second;
    }

    &.blue {
      background-color: $c2-main;
    }

    &.yellow {
      background-color: $c1-fourth;
    }

    &.red {
      background-color: $c1-third;
    }

    input {
      color: $c-white;
      font-family: $f1-second;
      background-color: transparent;
      border: 1px dashed rgba($c-white, 0.3);
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 0;
      margin-right: 40px;
      text-align: center;
      padding: 0;
      width: 100%;

      &::placeholder {
        color: rgba($c-white, 0.3);
      }

      &:focus {
        outline: 0;
        border-color: $c-white;
      }
    }
  }
}

h2 {
  font-size: 1.1rem;
  flex-grow: 1;
  min-height: 24px;
  margin: 1px 0 1px;

  &.isCentered {
    margin-right: 40px;
  }
}

h3 {
  color: $c1-main;
  margin-top: 1em;
  font-family: $f1-second;
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
}

.section {
  &:hover {
    .icon--indicator {
      color: color.adjust($c1-main, $lightness: -10%);
    }

    a {
      color: color.adjust($c1-main, $lightness: -10%);
      text-decoration: underline;
    }
  }

  &--flex {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5em;
  }

  &__input {
    color: $c1-main;
    font-family: $f1-second;
    background-color: transparent;
    border: 1px dashed $c1-grey;
    font-weight: bold;
    font-size: 1rem;
    padding: 0;
    text-align: left;
    text-transform: uppercase;
    flex-grow: 1;
    margin-right: 1em;
    min-width: 0;
    width: 100%;

    &:focus {
      outline: 0;
      border-color: $c1-main;
    }

    &--light {
      font-family: $f1-main;
      font-weight: 300;
      text-transform: none;
    }
  }
}

.tab {
  display: flex;
  justify-content: flex-start;

  &__item {
    background-color: transparent;
    border: 1px solid $c2-grey;
    border-bottom: 0;
    color: $c1-main;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5em 2em;
    margin-right: 0.5em;
    cursor: pointer;

    &.is-active {
      background-color: $c2-grey;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  background-color: $c2-grey;

  input {
    color: $c1-main;
    font-family: $f1-main;
    font-size: 1rem;
    font-weight: 300;
    padding: 0.5em 0.9em;
    margin-bottom: 0.5em;
    border: 1px solid $c1-grey;
    text-align: left;
    flex-grow: 1;

    &:focus {
      outline: 0;
      border-color: $c1-main;
    }

    &::placeholder {
      font-family: $f1-second;
      color: $c1-grey;
      font-weight: bold;
    }
  }

  input[type="submit"],
  .btn {
    color: $c-white;
    background-color: $c1-main;
    font-family: $f1-second;
    border: 0;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5em 1.7em;
    align-self: flex-start;
    margin-bottom: 0;
    width: auto;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.2);

    &:focus {
      outline: 0;
      background-color: color.adjust($c1-main, $lightness: -10%);
    }

    &:hover {
      background-color: color.adjust($c1-main, $lightness: -5%);
    }
  }

  .btn {
    display: flex;
    align-items: center;
    align-self: stretch;
    padding: 0.5em 0.7em;
    // box-shadow: none;
    margin-right: 0.5em;
  }

  div {
    margin-bottom: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      margin-bottom: 0;
      min-width: 0;
      flex: 1;
    }
  }
}

.colors {
  position: absolute;
  top: 57px;
  left: 50%;
  transform: translateX(-50%);

  ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .color {
    border-radius: 50%;
    margin: 0 0.2em;
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid $c-white;

    &--green {
      background: $c1-second;
    }

    &--blue {
      background-color: $c2-main;
    }

    &--yellow {
      background-color: $c1-fourth;
    }

    &--red {
      background-color: $c1-third;
    }
  }
}

ul {
  list-style-type: none;
  margin-top: 0;
  padding: 0;
  text-align: left;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 0;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &:first-child {
    h3,
    .section__input {
      margin-top: 0;
    }
  }
}

.icon {
  color: $c-white;
  width: 16px;
  height: 16px;

  &--indicator {
    color: $c1-main;
    margin-right: 1em;
    min-width: 16px;
  }

  &--changeable {
    cursor: pointer;
  }

  &-wrapper {
    background-color: $c1-main;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    cursor: pointer;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: color.adjust($c1-main, $lightness: -5%);
    }

    &--close {
      position: absolute;
      top: -10px;
      right: -10px;
      padding: 9px;

      .icon {
        width: 16px;
        height: 16px;
      }
    }

    &--edit {
      position: absolute;
      bottom: -10px;
      right: -10px;
      padding: 9px;

      .icon {
        width: 16px;
        height: 16px;
      }

      &.green {
        &:hover {
          background-color: $c1-second;
        }
      }

      &.blue {
        &:hover {
          background-color: $c2-main;
        }
      }

      &.red {
        &:hover {
          background-color: $c1-third;
        }
      }

      &.yellow {
        &:hover {
          background-color: $c1-fourth;
        }
      }
    }

    &--drag {
      background-color: transparent;
      box-shadow: none;

      &:hover {
        background-color: transparent;
      }
    }

    &--red {
      background-color: $c1-third;

      &:hover {
        background-color: color.adjust($c1-third, $lightness: -5%);
      }
    }

    &--light {
      background-color: $c2-grey;

      &:hover {
        background-color: color.adjust($c2-grey, $lightness: -5%);
      }

      .icon {
        color: $c1-main;
      }
    }

    &.handle {
      margin-right: 1em;
      cursor: move;
    }
  }
}

a,
.link {
  flex-grow: 2;
  display: block;
  color: $c1-main;
  font-family: $f1-main;
  font-size: 1rem;
  font-weight: 300;
  text-decoration: none;
}

p {
  margin: 0;
  padding: 1.5em;
  color: $c1-main;
  font-family: $f1-main;
}
</style>
