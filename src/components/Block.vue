<template>
  <div
    :class="{ isEditable: editable }"
    class="block">
    <header
      :class="this.blockColors.filter(item => { return item.selected })[0].name"
      class="block__header">
      <input type="text"
        v-if="editable"
        v-model="blockHeading">
      <h2 v-else>{{ blockHeading }}</h2>
      <span
        v-if="editable"
        @click="$emit('deleteBlock', index)"
        class="icon-wrapper">
        <icon
          name="times"
          class="icon icon--delete">
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
              class="icon">
            </icon>
          </li>
        </ul>
      </div>
    </header>
    <div class="block__content">
      <ul>
        <li
          v-if="blockItems.length"
          v-for="item in blockItems"
          :key="item.id"
          >
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
              class="section__span">
              <icon
                name="times"
                class="icon icon--delete">
              </icon>
            </span>
            <h3 v-else>{{ item.name }}</h3>
          </div>
          <div
            v-if="item.type === 'link'"
            class="section">
            <icon
              class="icon"
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
              class="section__span">
              <icon
                name="times"
                class="icon icon--delete">
              </icon>
            </span>
          </div>
        </li>
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
        <input
          type="text"
          v-model="newItem.name"
          placeholder="Name, z.B. dreiQBIK"
        />
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
  </div>
</template>

<script>
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

let nextItemId = 1;

export default {

  name: 'Block',

  components: {
    Icon
  },

  props: [
    'editable',
    'index',
    'block'
  ],

  data() {
    return {
      blockHeading: 'Links',
      newItem: {},
      groupEditable: false,
      itemEditable: true,
      blockItems: [
        {
          id: nextItemId++,
          type: 'heading',
          name: 'News',
          icon: 'anchor',
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
        }
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
        }
      ],
      blockIcons: [
        {
          name: 'anchor'
        },
        {
          name: 'windows'
        }
      ]
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
            icon: 'anchor',
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
            icon: 'anchor',
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
    }
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

    &.green {
      background: linear-gradient(to bottom right, $c1-second 0%, darken($c1-second, 2%) 100%);
    }

    &.blue {
      background: linear-gradient(to bottom right, $c2-main 0%, darken($c2-main, 2%) 100%);
    }

    &.yellow {
      background: linear-gradient(to bottom right, $c1-fourth 0%, darken($c1-fourth, 2%) 100%);
    }

    &.red {
      background: linear-gradient(to bottom right, $c1-third 0%, darken($c1-third, 2%) 100%);
    }

    input {
      color: $c-white;
      font-family: $f1-second;
      background-color: transparent;
      border: 1px dashed $c-white;
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 0;
      text-align: center;
      padding: 0;
      width: 100%;
    }
  }
}

h2 {
  font-size: 1.1rem;
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
    margin-top: 1em;
    text-align: left;
    text-transform: uppercase;
    flex-grow: 1;
    margin-right: 1em;
  }

  &__span {
    display: flex;
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
    padding: 0.57em 0.9em;
    margin-bottom: 0.5em;
    border: 1px solid $c1-grey;
    text-align: left;
    width: 100%;

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

  input[type="submit"] {
    color: $c-white;
    background-color: $c1-main;
    font-family: $f1-second;
    border: 1px solid darken($c1-main, 5%);
    cursor: pointer;
    font-weight: bold;
    padding: 0.5em 1.7em;
    align-self: flex-start;
    margin-bottom: 0;
    width: auto;

    &:hover {
      background-color: darken($c1-main, 5%);
    }
  }
}

.colors {
  margin-bottom: 0.5em;
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
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin: 0 0.2em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid $c-white;

    &--green {
      background: linear-gradient(to bottom right, $c1-second 0%, darken($c1-second, 2%) 100%);
    }

    &--blue {
      background: linear-gradient(to bottom right, $c2-main 0%, darken($c2-main, 2%) 100%);
    }

    &--yellow {
      background: linear-gradient(to bottom right, $c1-fourth 0%, darken($c1-fourth, 2%) 100%);
    }

    &--red {
      background: linear-gradient(to bottom right, $c1-third 0%, darken($c1-third, 2%) 100%);
    }
  }

  .icon {
    color: $c-white;
    height: 10px;
    margin-right: 0;
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
  width: auto;
  height: 1em;
  color: $c1-main;
  margin-right: 0.8em;
  background-color: transparent;
  border: 0;

  &--delete {
    cursor: pointer;
    margin-right: 0;
  }

  &-wrapper {
    background: linear-gradient(to bottom right, $c1-third 0%, darken($c1-third, 2%) 100%);
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: -10px;
    right: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    // border: 4px solid $c-white;

    .icon--delete {
      color: $c-white;
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

.btn {
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  border: 0;
  padding: 1em;
  width: 100%;

  &--delete {
    color: $c-white;
    background: linear-gradient(to bottom right, $c1-third 0%, darken($c1-third, 2%) 100%);
  }
}
</style>
