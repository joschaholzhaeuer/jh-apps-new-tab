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
      <span
        class="icon-wrapper">
        <icon
          name="plus"
          class="icon">
        </icon>
      </span>
    </button>
    <button
      @click="toggleEditable"
      class="btn-settings">
      <icon
        v-if="editable"
        name="check"
        class="icon">
      </icon>
      <icon
        v-else
        name="cog"
        class="icon">
      </icon>
    </button>
  </div>
</template>



<script>
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import Block from "./components/Block";

let nextBlockId = 1;

export default {

  name: "App",

  components: {
    Block,
    Icon
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
    grid-template-columns: repeat(3, minmax(340px, 1fr));
  }
}

.block-preview {
  background-color: $c2-grey;
  color: $c1-main;
  border: 0;
  font-size: 5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 2em;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: 0;
    box-shadow: 2px 2px 20px -1px rgba(0, 0, 0, 0.2);
  }

  .icon-wrapper {
    background-color: $c1-main;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    color: $c-white;
    width: auto;
    height: 25px;
  }
}

.btn-settings {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: $c1-main;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;
  color: $c-white;
  cursor: pointer;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: 0;
    // background-color: darken($c1-main, 5%);
    box-shadow: 2px 2px 20px -1px rgba(0, 0, 0, 0.2);
  }

  .icon {
    width: auto;
    height: 25px;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
