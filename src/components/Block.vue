<template>
  <div
    :class="{ isEditable: editable }"
    class="block">
    <header
      :class="activeColor"
      class="block__header block__handle">
      <span
        v-if="editable"
        class="icon-wrapper icon-wrapper--drag handle">
        <icon
          name="arrows"
          class="icon">
        </icon>
      </span>
      <input type="text"
        v-if="editable"
        v-model="blockHeading">
      <h2 v-else>{{ blockHeading }}</h2>
      <span
        v-if="editable && !showIcons"
        @click="$emit('deleteBlock', index)"
        class="icon-wrapper icon-wrapper--close icon-wrapper--red">
        <icon
          name="times"
          class="icon">
        </icon>
      </span>
      <div
        v-if="editable"
        class="colors">
        <ul>
          <li
            v-for="color in blockColors"
            :key="color.id"
            :class="'color--' + color.name"
            :data-selected="color.selected"
            @click="changeColor(color.id)"
            class="color">
            <icon
              v-if="color.selected"
              name="check"
              class="icon icon--colored">
            </icon>
          </li>
        </ul>
      </div>
    </header>
    <div class="block__content">
      <ul>
        <draggable
          v-if="blockItems.length"
          v-model="blockItems"
          @start="drag = true"
          @end="drag = false"
          :options="{
            group: 'block',
            disabled: editable ? false : true,
            handle: '.handle'
          }">
          <li
            v-for="item in blockItems"
            :key="item.id"
            >
            <span
              v-if="editable"
              class="icon-wrapper icon-wrapper--light handle">
              <icon
                name="arrows"
                class="icon">
              </icon>
            </span>
            <div
              v-if="item.type === 'heading'"
              class="section">
              <input type="text"
                v-if="editable"
                v-model="item.name"
                class="section__input">
              <span
                v-if="editable"
                @click="removeItem(item.id)"
                class="icon-wrapper">
                <icon
                  name="times"
                  class="icon">
                </icon>
              </span>
              <h3 v-else>{{ item.name }}</h3>
            </div>
            <div
              v-if="item.type === 'link'"
              class="section">
              <icon
                class="icon icon--indicator"
                :name="item.icon">
              </icon>
              <span
                v-if="editable"
                class="link">{{ item.name }}</span>
              <a
                v-else
                :href="item.link"
                class="link">{{ item.name }}</a>
              <span
                v-if="editable"
                @click="removeItem(item.id)"
                class="icon-wrapper">
                <icon
                  name="times"
                  class="icon">
                </icon>
              </span>
            </div>
          </li>
        </draggable>
        <p v-else>No links entered yet. Start adding your favorite links and websites!</p>
      </ul>
      <div
        v-if="editable"
        class="tab">
        <span
          @click="switchTabs('item')"
          :class="{ 'is-active': itemEditable }"
          class="tab__item">Links</span>
        <span
          @click="switchTabs('heading')"
          :class="{ 'is-active': groupEditable }"
          class="tab__item">Gruppe</span>
      </div>
      <form
        v-if="editable && itemEditable"
        @submit.prevent="addItem('link')">
        <div>
          <input
            type="text"
            v-model="newItem.name"
            placeholder="Name, z.B. dreiQBIK"
          />
          <span
            @click="chooseIcon"
            class="btn">
            <icon
              :name="newItem.icon || 'anchor'"
              class="icon">
            </icon>
          </span>
        </div>
        <input
          type="text"
          v-model="newItem.link"
          placeholder="Link, z.B. https://dreiqbik.de"
        />
        <input type="submit" value="Hinzufügen">
      </form>
      <form
        v-if="editable && groupEditable"
        @submit.prevent="addItem('heading')">
        <input
          type="text"
          v-model="newItem.name"
          placeholder="Name"
        />
        <input type="submit" value="Hinzufügen">
      </form>
    </div>
    <Overlay
      v-if="showIcons"
      :activeColor="activeColor"
      @setIcon="setIcon"></Overlay>
  </div>
</template>

<script>
import 'vue-awesome/icons';
import Overlay from "./Overlay";
import Icon from 'vue-awesome/components/Icon';
import draggable from 'vuedraggable';

let nextItemId = 1;

export default {

  name: 'Block',

  components: {
    Icon,
    draggable,
    Overlay,
  },

  props: [
    'editable',
    'index',
    'block',
  ],

  data() {
    return {
      blockHeading: 'Links',
      newItem: {},
      activeColor: 'green',
      groupEditable: false,
      itemEditable: true,
      blockItems: [
        {
          id: nextItemId++,
          type: 'heading',
          name: 'News',
        },
        {
          id: nextItemId++,
          type: 'link',
          name: 'Medium',
          icon: 'anchor',
          link: 'https://medium.com',
        },
        {
          id: nextItemId++,
          type: 'link',
          name: 'Die Zeit',
          icon: 'anchor',
          link: 'https://zeit.de',
        },
      ],
      blockColors: [
        {
          id: 1,
          name: 'green',
          selected: true
        },
        {
          id: 2,
          name: 'blue',
          selected: false
        },
        {
          id: 3,
          name: 'yellow',
          selected: false
        },
        {
          id: 4,
          name: 'red',
          selected: false
        },
      ],
      blockIcons: [
        {
          name: 'anchor'
        },
        {
          name: 'windows'
        },
      ],
      showIcons: false,
    };
  },

  methods: {

    toggleEditable: function() {
      const self = this;
      self.editable = !self.editable;
    },

    addItem: function(type) {
      const self = this;
      let trimmedName;
      let trimmedLink;

      // type = heading
      if (type === 'heading') {
        if (self.newItem.name) {
          trimmedName = self.newItem.name.trim();

          // add new item
          self.blockItems.push({
            id: nextItemId++,
            type: 'heading',
            name: trimmedName,
          });
        } else {
          return;
        }

      // type = link
      } else if (type === 'link') {
        if (self.newItem.name && self.newItem.link) {
          trimmedName = self.newItem.name.trim();
          trimmedLink = self.newItem.link.trim();

          // add new item
          self.blockItems.push({
            id: nextItemId++,
            type: 'link',
            name: trimmedName,
            icon: self.newItem.icon || 'anchor',
            link: trimmedLink,
          });
        } else {
          return;
        }
      }

      // clear new item data
      self.newItem = {};
    },

    removeItem: function(idToRemove) {
      const self = this;

      // get items to keep
      self.blockItems = self.blockItems.filter(item => {
        return item.id !== idToRemove;
      });
    },

    changeColor: function(colorId) {
      const self = this;

      // get previous selected color and set to false
      const previousColor = self.blockColors.filter(item => {
        return item.selected;
      })[0];

      // unselect previous selected color
      if (previousColor) {
        previousColor.selected = false;
      }

      // set clicked color to selected
      self.blockColors.filter(item => {
        return item.id === colorId;
      })[0].selected = true;

      // save to data
      self.activeColor = self.blockColors.filter(item => { return item.selected })[0].name;
    },

    getSelectedColor: function() {
      const self = this;
      const selectedColor = self.blockColors.filter(item => {
        return item.selected === true;
      })[0];
    },

    switchTabs: function(activeTab) {
      const self = this;
      if (activeTab === 'heading') {
        self.groupEditable = true;
        self.itemEditable = false;
      } else {
        self.itemEditable = true;
        self.groupEditable = false;
      }
    },

    chooseIcon: function() {
      var self = this;
      self.showIcons = true;
    },

    setIcon: function(iconName) {
      var self = this;
      self.showIcons = false;
      self.newItem.icon = iconName;
    },
  }

};
</script>

<style scoped lang="scss">

// colors
$c-black: #2c3e50;
$c1-grey: #d7dfe9;
$c2-grey: #eaf0f6;
$c-white: #fff;

$c1-main: #afb8c2;
$c2-main: #427fb9;
$c1-second: #42b983;
$c1-third: #ee6161;
$c1-fourth: #ecd261;

// fonts
$f1-main: 'Merriweather', 'Times New Roman', serif;
$f1-second: 'Open Sans', 'Helvetica', sans-serif;

h1,
h2,
h3 {
  margin: 0;
  font-weight: bold;
}

.block {
  background-color: $c-white;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.1);
  position: relative;

  &.isEditable {
    min-height: 450px;

    .block__handle {
      cursor: move;
    }
  }

  &__content {
    padding: 1.5em;

    li {
      &:last-child {
        padding-bottom: 0;
      }
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
      margin-right: 39px;
      text-align: center;
      padding: 0;
      width: 100%;

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
}

h3 {
  color: $c1-main;
  margin-top: 1em;
  font-family: $f1-second;
  font-size: 0.9rem;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
}

.section {

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
    font-size: 0.9rem;
    padding: 0;
    text-align: left;
    text-transform: uppercase;
    flex-grow: 1;
    margin-right: 1em;

    &:focus {
      outline: 0;
      border-color: $c1-main;
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
    font-size: 0.9rem;
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
    font-size: 0.9rem;
    font-weight: 300;
    padding: 0.5em 0.9em;
    margin-bottom: 0.5em;
    border: 1px solid $c1-grey;
    text-align: left;

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
    font-size: 0.9rem;
    font-weight: bold;
    padding: 0.5em 1.7em;
    align-self: flex-start;
    margin-bottom: 0;
    width: auto;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.2);

    &:focus {
      outline: 0;
      background-color: darken($c1-main, 10%);
    }

    &:hover {
      background-color: darken($c1-main, 5%);
    }
  }

  .btn {
    display: flex;
    align-items: center;
    align-self: stretch;
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
  top: 54px;
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
  width: 14px;
  height: 14px;

  &--indicator {
    color: $c1-main;
    margin-right: 1em;
    min-width: 14px;
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
      background-color: darken($c1-main, 5%);
    }

    &--close {
      position: absolute;
      top: -10px;
      right: -10px;
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
        background-color: darken($c1-third, 5%);
      }
    }

    &--light {
      background-color: $c2-grey;

      &:hover {
        background-color: darken($c2-grey, 5%);
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
  font-size: 0.9rem;
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
