<template>
  <div class="block">
    <header>
      <h2>{{ blockHeading }}</h2>
      <button v-if="editable" v-on:click="toggleEditable">Speichern</button>
      <button v-else v-on:click="toggleEditable">Bearbeiten</button>
    </header>
    <div class="block__content">
      <form v-if="editable" v-on:submit="addItem">
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
          <button v-if="editable" v-on:click="removeItem(item.id)">Entfernen</button>
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
  data() {
    return {
      blockHeading: "Links",
      newItem: {},
      editable: false,
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
    removeItem(idToRemove) {
      this.blockItems = this.blockItems.filter(item => {
        return item.id !== idToRemove;
      });
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1,
h2 {
  font-weight: 700;
}

.block {
  background-color: #fff;

  &__content {
    padding: 1em 0;
  }
}

h2 {
  color: #fff;
  background-color: #42b983;
  padding: 1em;
  margin: 0;
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
  color: #fff;
  background-color: #42b983;
  border: 1px solid darken(#42b983, 10%);
  cursor: pointer;

  &:hover {
    background-color: darken(#42b983, 10%);
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
  display: block;
}

a {
  display: block;
  color: #42b983;
  padding: 0.5em 0;
  font-family: 'Merriweather';
}
</style>
