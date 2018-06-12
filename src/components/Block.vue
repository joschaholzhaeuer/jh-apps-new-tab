<template>
  <div
    :class="{ isEditable: editable }"
    class="block">
    <header
      :class="this.blockColors.filter(item => { return item.selected })[0].name">
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
    <div
      v-for="group in groups"
      :key="group.id"
      class="block__content">
      <input type="text"
        v-if="editable"
        v-model="group.heading"
        class="block__input">
      <h3 v-else>{{ group.heading }}</h3>
      <ul v-if="group.items.length">
        <li
          v-for="item in group.items"
          :key="item.id"
          >
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
            class="block__span">
            <icon
              name="times"
              class="icon icon--delete">
            </icon>
          </span>
        </li>
      </ul>
      <p v-else>No links entered yet. Start adding your favorite links and websites!</p>
      <form
        v-if="editable"
        @submit="addItem">
        <input
          type="text"
    			v-model="newItem.name"
    			placeholder="Name"
    		/>
        <input
          type="text"
    			v-model="newItem.link"
    			placeholder="Link"
    		/>
        <input type="submit" value="Link hinzufügen">
      </form>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

let nextItemId = 1;
let nextGroupId = 1;

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
      groups: [
        {
          id: nextGroupId++,
          heading: 'News',
          items: [
            {
              id: nextItemId++,
              name: 'Medium',
              link: 'https://medium.com',
              icon: 'anchor'
            },
            {
              id: nextItemId++,
              name: 'Die Zeit',
              link: 'https://zeit.de',
              icon: 'anchor'
            }
          ]
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
      ]
    };
  },

  methods: {

    toggleEditable: function() {
      const self = this;
      self.editable = !self.editable;
    },

    addItem: function(e) {
      const self = this;
      e.preventDefault();

      if (self.newItem.name && self.newItem.link) {

        // trim input values
        const trimmedName = self.newItem.name.trim();
        const trimmedLink = self.newItem.link.trim();

        // add new item to items group
        self.groups[self.groups.length - 1].items.push({
          id: nextItemId++,
          name: trimmedName,
          link: trimmedLink,
          icon: 'anchor'
        });
        self.newItem = {};
      }
    },

    removeItem: function(idToRemove) {
      const self = this;

      self.groups.filter(group => {

        // get items to keep
        const itemsToKeep = group.items.filter(item => {
          return item.id !== idToRemove;
        });

        // save items without the deleted one
        group.items = itemsToKeep;
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
  font-weight: 700;
}

.block {
  background-color: $c-white;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.1);
  position: relative;

  &__content {
    padding: 1.5em 1.5em 1em;

    li {
      &:last-child {
        padding-bottom: 0;
      }
    }
  }

  &__input {
    color: $c1-grey;
    font-family: $f1-second;
    background-color: transparent;
    border: 0;
    font-weight: bold;
    font-size: 1rem;
    padding: 0;
    width: 100%;
    margin-bottom: 0.5em;
    text-align: left;
  }

  &__span {
    display: flex;
  }

  // &.isEditable {

  // }
}

header {
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
    border: 0;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0;
    text-align: center;
    padding: 0;
  }
}

h2 {
  font-size: 1.2rem;
}

h3 {
  margin-bottom: 0.5em;
  font-size: 1rem;
  color: $c1-grey;
  text-align: left;
}

form {
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  input {
    color: $c1-main;
    font-family: $f1-main;
    font-size: 1rem;
    font-weight: normal;
    padding: 0.57em 1.7em;
    margin-bottom: 0.5em;
    border: 1px solid $c2-grey;
    border-radius: 20px;
    text-align: left;

    &[type="submit"] {
      font-family: $f1-second;
    }

    &:focus {
      outline: 0;
      border-color: $c1-main;
    }

    &::placeholder {
      color: $c1-grey;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  input[type="submit"] {
    color: $c-white;
    background-color: $c1-main;
    border: 1px solid darken($c1-main, 5%);
    cursor: pointer;
    font-weight: 700;
    padding: 0.5em 1.7em;
    align-self: flex-start;

    &:hover {
      background-color: darken($c1-main, 5%);
    }
  }
}

.colors {
  margin-bottom: 0.5em;
  position: absolute;
  top: 55px;
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
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 0.2em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid $c-white;

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
  font-size: 1rem;
  font-weight: 700;
  border: 0;
  padding: 1em;
  width: 100%;

  &--delete {
    color: $c-white;
    background: linear-gradient(to bottom right, $c1-third 0%, darken($c1-third, 2%) 100%);
  }
}
</style>
