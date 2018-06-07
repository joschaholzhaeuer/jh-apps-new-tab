<template>
  <div id="app">
    <Block
      v-for="(block, index) in blocks"
      :editable="editable"
      :block="block"
      :index="index"
      :key="block.id"
      @deleteBlock="deleteBlock(index)"
    />
    <button
      v-if="editable && blocks.length < 9"
      @click="addBlock"
      class="block-preview">
      +
    </button>
    <button
      v-if="editable"
      @click="toggleEditable"
      class="btn-settings">
      Speichern
    </button>
    <button
      v-else
      @click="toggleEditable"
      class="btn-settings">
      Bearbeiten
    </button>
  </div>
</template>

<script>
import Block from "./components/Block";

let nextBlockId = 1;

export default {

  name: "App",

  components: {
    Block
  },

  data() {
    return {
      blocks: [
        {
          id: nextBlockId++
        }
      ],
      editable: false
    };
  },

  methods: {

    toggleEditable: function() {
      this.editable = !this.editable;
    },

    addBlock: function() {
      this.blocks.push({
        id: nextBlockId++
      });
    },

    deleteBlock: function(index) {
      this.blocks.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: #f2f4f6;
}

#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f2f4f6;
  padding: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1em;
  max-width: 1200px;
  margin: 1em auto 0;
}

.block-preview {
  background-color: #f2f4f6;
  color: #42b983;
  border: 3px solid #42b983;
  font-size: 5rem;
  cursor: pointer;
}

.btn-settings {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #e0e0e0;
  border: 0;
  color: #fff;
  padding: 2em;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
}
</style>
