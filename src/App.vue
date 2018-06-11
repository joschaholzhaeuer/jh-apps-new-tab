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

// colors
$c-black: #2c3e50;
$c1-grey: #b7babd;
$c2-grey: #f2f4f6;
$c-white: #fff;

$c1-main: #42b983;
$c1-second: #427fb9;
$c1-third: #ee6161;

// fonts
$f1-main: 'Merriweather', 'Times New Roman', serif;
$f1-second: 'Open Sans', 'Helvetica', Arial, sans-serif;

// breakpoints
@mixin b-small {
  @media (min-width: 840px) { @content; }
}
@mixin b-medium {
  @media (min-width: 1240px) { @content; }
}
@mixin b-large {
  @media (min-width: 1530px) { @content; }
}

body {
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
  background-color: $c2-grey;
  padding: 2em;
  display: grid;
  grid-template-columns: minmax(340px, 1fr);
  grid-gap: 1em;
  max-width: 1200px;
  margin: 1em auto 0;

  @include b-small {
    grid-template-columns: repeat(2, minmax(340px, 1fr));
  }

  @include b-medium {
    // padding: 2em 0;
    grid-template-columns: repeat(3, minmax(340px, 1fr));
  }
}

.block-preview {
  background-color: $c2-grey;
  color: $c1-main;
  border: 3px solid $c1-main;
  font-size: 5rem;
  cursor: pointer;
}

.btn-settings {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: $c1-grey;
  border: 0;
  color: $c-white;
  padding: 2em;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
}
</style>
