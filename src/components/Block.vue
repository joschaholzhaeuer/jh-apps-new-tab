<template>
  <div
    :class="{ isEditable: editable }"
    class="block">
    <header>
      <input type="text"
        v-if="editable"
        v-model="blockHeading">
      <h2 v-else>{{ blockHeading }}</h2>
      <icon
        v-if="editable"
        name="times"
        @click="$emit('deleteBlock', index)"
        class="icon icon--delete icon--white"></icon>
    </header>
    <div class="block__content">
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
      <ul v-if="blockItems.length">
        <li
          v-for="item in blockItems"
          :key="item.id"
          >
          <icon
            class="icon"
            :name="item.icon"></icon>
          <a :href="item.link">{{ item.name }}</a>
          <icon
            v-if="editable"
            name="times"
            @click="removeItem(item.id)"
            class="icon icon--delete">
          </icon>
        </li>
      </ul>
      <p v-else>No links entered yet. Start adding your favorite links and websites!</p>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

let nextItemId = 1;

export default {

  name: "Block",

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
      blockHeading: "Links",
      newItem: {},
      blockItems: [
        {
          id: nextItemId++,
          name: "Medium",
          link: "https://medium.com",
          icon: "anchor"
        },
        {
          id: nextItemId++,
          name: "Die Zeit",
          link: "https://zeit.de",
          icon: "anchor"
        }
      ]
    };
  },

  methods: {

    toggleEditable: function() {
      this.editable = !this.editable;
    },

    addItem: function(e) {
      e.preventDefault();

      if (this.newItem.name && this.newItem.link) {

        const trimmedName = this.newItem.name.trim();
        const trimmedLink = this.newItem.link.trim();

        this.blockItems.push({
          id: nextItemId++,
          name: trimmedName,
          link: trimmedLink,
          icon: 'anchor'
        });
        this.newItem = {};
      }
    },

    removeItem: function(idToRemove) {
      console.log('removed');
      this.blockItems = this.blockItems.filter(item => {
        return item.id !== idToRemove;
      });
    }
  }

};
</script>

<style scoped lang="scss">
$c-black: #2c3e50;
$c1-grey: #b7babd;
$c2-grey: #f2f4f6;
$c-white: #fff;

$c1-main: #42b983;
$c1-second: #427fb9;
$c1-third: #ee6161;

$f1-main: 'Merriweather', 'Times New Roman', serif;
$f1-second: 'Open Sans', 'Helvetica', sans-serif;

*,
*:after,
*:before {
  box-sizing: border-box;
}

h1,
h2 {
  font-weight: 700;
}

.block {
  background-color: $c-white;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.05);

  &__content {
    padding: 1em 1.5em;
  }

  &.isEditable {

    header {
      display: flex;
      align-items: center;
    }
  }
}

header {
  position: relative;
  color: $c-white;
  background-color: $c1-main;
  padding: 1em 1.5em;

  input {
    color: $c-white;
    font-family: $f1-second;
    background-color: transparent;
    border: 0;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0;
    text-align: center;
    width: 100%;
    max-width: 400px;
    padding: 0;
  }
}

h2 {
  margin: 0;
  font-size: 1.2rem;
}

form {
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
}

input {
  color: $c1-grey;
  font-family: $f1-main;
  font-size: 1rem;
  padding: 1em 1.5em;
  margin-bottom: 0.5em;
  border: 1px solid $c2-grey;
  border-radius: 5px;

  &[type="submit"] {
    font-family: $f1-second;
  }

  &:focus {
    outline: 0;
    border-color: $c1-grey;
  }

  &::placeholder {
    color: inherit;
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

  &:hover {
    background-color: darken($c1-main, 5%);
  }
}

ul {
  list-style-type: none;
  padding: 1em 0;
  margin: 0 auto;
  text-align: left;
  max-width: 400px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  width: auto;
  height: 1em;
  max-width: 100%;
  max-height: 100%;
  color: $c1-grey;
  margin-right: 1em;
  font-size: 1rem;
  background-color: transparent;
  border: 0;
  cursor: pointer;

  &--delete {
    margin-right: 0;
    color: $c1-third;
  }

  &--white {
    color: $c-white;
  }
}

a {
  flex-grow: 2;
  display: block;
  color: $c1-grey;
  padding: 0.5em 0;
  font-family: $f1-main;
  text-decoration: none;
}

p {
  margin: 0;
  padding: 1.5em;
  color: $c1-grey;
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
    background-color: $c1-third;
  }
}
</style>
