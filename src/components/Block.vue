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
    <header
      :class="[activeColor, { rounded: styleRounded }]"
      class="block__header block__handle"
    >
      <span
        v-if="globalEditable"
        class="icon-wrapper icon-wrapper--drag handle"
      >
        <font-awesome-icon icon="arrows-alt" class="icon" />
      </span>
      <input
        type="text"
        v-if="globalEditable && blockEditable"
        placeholder="Heading"
        v-model="blockHeading"
        :id="`block-heading-${id}`"
        :name="`block-heading-${id}`"
      />
      <h2 v-else :class="{ isCentered: globalEditable }">{{ blockHeading }}</h2>
      <span
        v-if="globalEditable && !showIcons"
        @click="$emit('deleteBlock', index)"
        class="icon-wrapper icon-wrapper--close icon-wrapper--red"
      >
        <font-awesome-icon icon="times" class="icon" />
      </span>
      <div v-if="globalEditable && blockEditable" class="colors">
        <ul>
          <li
            v-for="color in blockColors"
            :key="color.id"
            :class="'color--' + color.name"
            :data-selected="color.selected"
            @click="changeColor(color.id)"
            class="color"
          >
            <font-awesome-icon
              v-if="color.selected"
              icon="check"
              class="icon icon--colored"
            />
          </li>
        </ul>
      </div>
    </header>
    <div class="block__content">
      <ul>
        <draggable
          v-model="blockItems"
          v-if="blockItems.length"
          @add="triggerDataUpdate"
          @remove="triggerDataUpdate"
          @end="triggerDataUpdate"
          group="blockList"
          :disabled="globalEditable && blockEditable ? false : true"
          handle=".handle"
          item-key="id"
        >
          <template #item="{ element: item }">
            <li :key="item.id">
              <span
                v-if="globalEditable && blockEditable"
                class="icon-wrapper icon-wrapper--light handle"
              >
                <font-awesome-icon icon="arrows-alt" class="icon" />
              </span>
              <div v-if="item.type === 'heading'" class="section">
                <input
                  type="text"
                  v-if="globalEditable && blockEditable"
                  v-model="item.name"
                  class="section__input"
                  :id="`heading-${item.id}`"
                  :name="`heading-${item.id}`"
                />
                <span
                  v-if="globalEditable && blockEditable"
                  @click="removeItem(item.id)"
                  class="icon-wrapper"
                >
                  <font-awesome-icon icon="times" class="icon" />
                </span>
                <h3 v-else>{{ item.name }}</h3>
              </div>
              <div v-if="item.type === 'link'" class="section">
                <span
                  v-if="globalEditable && blockEditable"
                  @click="chooseIcon(item.icon, item.id)"
                >
                  <font-awesome-icon
                    class="icon icon--indicator icon--changeable"
                    :icon="item.icon"
                  />
                </span>
                <font-awesome-icon
                  v-else
                  class="icon icon--indicator"
                  :icon="item.icon"
                />
                <div
                  v-if="globalEditable && blockEditable"
                  class="section section--flex"
                >
                  <input
                    type="text"
                    v-model="item.name"
                    class="section__input section__input--light"
                    :id="`link-name-${item.id}`"
                    :name="`link-name-${item.id}`"
                  />
                  <input
                    type="text"
                    v-model="item.link"
                    class="section__input section__input--light"
                    :id="`link-url-${item.id}`"
                    :name="`link-url-${item.id}`"
                  />
                </div>
                <a v-else :href="item.link" class="link">{{ item.name }}</a>
                <span
                  v-if="globalEditable && blockEditable"
                  @click="
                    removeItem(item.id);
                    triggerDataUpdate();
                  "
                  class="icon-wrapper"
                >
                  <font-awesome-icon icon="times" class="icon" />
                </span>
              </div>
            </li>
          </template>
        </draggable>
        <p v-else>
          No links saved yet. Start adding your favorite links and websites!
        </p>
      </ul>
      <div v-if="globalEditable && blockEditable" class="tab">
        <span
          @click="switchTabs('item')"
          :class="{ 'is-active': itemEditable }"
          class="tab__item"
          >Links</span
        >
        <span
          @click="switchTabs('heading')"
          :class="{ 'is-active': groupEditable }"
          class="tab__item"
          >Group</span
        >
      </div>
      <form
        v-if="globalEditable && blockEditable && itemEditable"
        @submit.prevent="
          addItem('link');
          triggerDataUpdate();
        "
      >
        <div>
          <span @click="chooseIcon(newItem.icon || 'tag', '')" class="btn">
            <font-awesome-icon :icon="newItem.icon || 'tag'" class="icon" />
          </span>
          <input
            type="text"
            v-model="newItem.name"
            placeholder="Name, e.g. dreiQBIK"
            :id="`new-link-name-${id}`"
            name="new-link-name"
          />
        </div>
        <input
          type="text"
          v-model="newItem.link"
          placeholder="Link, e.g. https://dreiqbik.de"
          :id="`new-link-url-${id}`"
          name="new-link-url"
        />
        <input type="submit" value="Add" name="add-link-submit" />
      </form>
      <form
        v-if="globalEditable && blockEditable && groupEditable"
        @submit.prevent="addItem('heading')"
      >
        <input
          type="text"
          v-model="newItem.name"
          placeholder="Name"
          :id="`new-heading-name-${id}`"
          name="new-heading-name"
        />
        <input type="submit" value="Add" name="add-heading-submit" />
      </form>
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
      @click="blockEditable = false"
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

export default {
  name: "Block",

  components: {
    draggable,
    Overlay,
  },

  props: ["globalEditable", "styleRounded", "styleDark", "index", "block"],

  data() {
    return {
      id: this.block.id,
      blockEditable: this.block.blockEditable,
      blockHeading: "",
      newItem: {},
      activeColor: "green",
      groupEditable: false,
      itemEditable: true,
      blockItems: [],
      blockColors: [
        {
          id: 1,
          name: "green",
          selected: true,
        },
        {
          id: 2,
          name: "blue",
          selected: false,
        },
        {
          id: 3,
          name: "yellow",
          selected: false,
        },
        {
          id: 4,
          name: "red",
          selected: false,
        },
      ],
      showIcons: false,
      currentIcon: "tag",
      selectedItemId: "",
      rowHeight: "1",
    };
  },

  methods: {
    addItem(type) {
      const self = this;
      let trimmedName;
      let trimmedLink;

      // type = heading
      if (type === "heading") {
        if (self.newItem.name) {
          trimmedName = self.newItem.name.trim();

          // add new item
          self.blockItems.push({
            id: self.generateUniqueId(),
            type: "heading",
            name: trimmedName,
          });
        } else {
          return;
        }

        // type = link
      } else if (type === "link") {
        if (self.newItem.name && self.newItem.link) {
          trimmedName = self.newItem.name.trim();
          trimmedLink = self.newItem.link.trim();

          // add new item
          self.blockItems.push({
            id: self.generateUniqueId(),
            type: "link",
            name: trimmedName,
            icon: self.newItem.icon || "tag",
            link: trimmedLink,
          });
        } else {
          return;
        }
      }

      // adjust block height, if enough items were added
      self.adjustRowHeight();

      // clear new item data
      self.newItem.name = "";
      self.newItem.link = "";
    },

    removeItem(idToRemove) {
      const self = this;

      // get items to keep
      self.blockItems = self.blockItems.filter((item) => {
        return item.id !== idToRemove;
      });

      // adjust block height, if enough items were added
      self.adjustRowHeight();
    },

    adjustRowHeight() {
      const self = this;

      // get number of items and set row height
      const numberOfItems = self.blockItems.length;
      if (numberOfItems < 10) {
        self.rowHeight = "1";
      } else if (numberOfItems >= 10 && numberOfItems < 20) {
        self.rowHeight = "2";
      } else {
        self.rowHeight = "3";
      }
    },

    changeColor(colorId) {
      const self = this;

      // get previous selected color and set to false
      const previousColor = self.blockColors.filter((item) => {
        return item.selected;
      })[0];

      // unselect previous selected color
      if (previousColor) {
        previousColor.selected = false;
      }

      // set clicked color to selected
      self.blockColors.filter((item) => {
        return item.id === colorId;
      })[0].selected = true;

      // save to data
      self.activeColor = self.blockColors.filter((item) => {
        return item.selected;
      })[0].name;
    },

    getSelectedColor() {
      const self = this;
      const selectedColor = self.blockColors.filter((item) => {
        return item.selected === true;
      })[0];
    },

    switchTabs(activeTab) {
      const self = this;
      if (activeTab === "heading") {
        self.groupEditable = true;
        self.itemEditable = false;
      } else {
        self.itemEditable = true;
        self.groupEditable = false;
      }
    },

    chooseIcon(iconName, itemIdToChange) {
      const self = this;
      self.showIcons = true;
      self.selectedItemId = itemIdToChange;
      self.currentIcon = iconName || newItem.icon || "tag";
    },

    setIcon(iconName, itemIdToChange) {
      const self = this;
      self.showIcons = false;
      if (itemIdToChange === "") {
        self.newItem.icon = iconName;
      } else {
        const targetItem = self.blockItems.find((item) => {
          return item.id === itemIdToChange;
        });
        if (targetItem) {
          targetItem.icon = iconName;
        }
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

    triggerDataUpdate() {
      // console.log('edited')
      this.$emit("updateBlocks", this.$data);
    },

    getData() {
      const self = this;
      try {
        chrome.storage.local.get("blocks", (result) => {
          if (result.blocks !== undefined && result.blocks.length) {
            const allBlocks = result.blocks;
            allBlocks.forEach((item) => {
              if (item.id === self.id) {
                self.blockHeading = item.blockHeading || self.blockHeading;
                self.activeColor = item.activeColor || self.activeColor;
                self.blockColors = item.blockColors || self.blockColors;
                self.blockItems = item.blockItems || self.blockItems;
                self.rowHeight = item.rowHeight || self.rowHeight;
                self.blockEditable = item.blockEditable || self.blockEditable;
              }
            });
          }
        });
      } catch (error) {
        if (localStorage.getItem("blocks")) {
          const allBlocks = JSON.parse(localStorage.getItem("blocks"));
          allBlocks.forEach((item) => {
            if (item.id === self.id) {
              self.blockHeading = item.blockHeading || self.blockHeading;
              self.activeColor = item.activeColor || self.activeColor;
              self.blockItems = item.blockItems || self.blockItems;
              self.blockColors = item.blockColors || self.blockColors;
              self.rowHeight = item.rowHeight || self.rowHeight;
              self.blockEditable = item.blockEditable || self.blockEditable;
            }
          });
        }
      }
    },
  },

  created() {
    const self = this;
    self.getData();
  },

  watch: {
    blockEditable() {
      this.triggerDataUpdate();
    },
    globalEditable() {
      if (!this.globalEditable) this.blockEditable = false;
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
