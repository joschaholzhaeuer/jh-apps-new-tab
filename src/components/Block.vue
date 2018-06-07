<template>
  <div
    :class="{ isEditable: editable }"
    class="block">
    <header>
      <input type="text"
        v-if="editable"
        v-model="blockHeading">
      <h2 v-else>{{ blockHeading }}</h2>
      <button
        v-if="editable"
        @click="$emit('deleteBlock', index)"
        class="btn-delete btn-delete--inline">
        x
      </button>
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
          <a :href="item.link">{{ item.name }}</a>
          <button
            v-if="editable"
            @click="removeItem(item.id)"
            class="btn-delete">
            x
          </button>
        </li>
      </ul>
      <p v-else>No links entered yet</p>
    </div>
  </div>
</template>

<script>
let nextItemId = 1;

export default {

  name: "Block",

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
          link: "https://medium.com"
        },
        {
          id: nextItemId++,
          name: "Die Zeit",
          link: "https://zeit.de"
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
          link: trimmedLink
        });
        this.newItem = {};
      }
    },

    removeItem: function(idToRemove) {
      this.blockItems = this.blockItems.filter(item => {
        return item.id !== idToRemove;
      });
    }
  }

};
</script>

<style scoped lang="scss">
$c-black: #2c3e50;
$c1-grey: #e0e0e0;
$c2-grey: #f2f4f6;
$c-white: #fff;

$c1-main: #42b983;
$c1-second: #427fb9;
$c1-third: #ee6161;

h1,
h2 {
  font-weight: 700;
}

.block {
  background-color: $c-white;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.05);

  &__content {
    padding: 1em 0;
  }

  &.isEditable {
    // animation: wobble 1s infinite linear;
  }
}

// @keyframes wobble {
//   0% {
//     transform: translate(0);
//   }
//   33% {
//     transform: translate(-1px);
//   }
//   66% {
//     transform: translate(1px);
//   }
//   100% {
//     transform: translate(0);
//   }
// }

header {
  position: relative;
}

h2 {
  color: $c-white;
  background-color: $c1-main;
  padding: 1em;
  margin: 0;
  font-size: 1.2rem;
}

form {
  padding: 1em 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
}

input {
  font-size: 1rem;
  padding: 0.5em;
  margin-bottom: 0.5em;

  &:last-child {
    margin-bottom: 0;
  }
}

input[type="submit"] {
  color: $c-white;
  background-color: $c1-main;
  border: 1px solid darken($c1-main, 10%);
  cursor: pointer;

  &:hover {
    background-color: darken($c1-main, 10%);
  }
}

ul {
  list-style-type: none;
  padding: 1em;
  margin: 0 auto;
  text-align: left;
  max-width: 400px;
}

li {
  display: flex;
  justify-content: space-between;
}

a {
  flex-grow: 2;
  display: block;
  color: $c1-grey;
  padding: 0.5em 0;
  font-family: 'Merriweather';
}

.btn-delete {
  background-color: transparent;
  border: 0;
  color: $c1-third;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  &--inline {
    position: absolute;
    top: 50%;
    right: 1em;
    transform: translateY(-50%);
    color: $c-white;
  }
}
</style>
