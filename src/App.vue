<template>
  <div id="app">
    <draggable
      v-model="blocks"
      :options="{ disabled: editable ? false : true, handle: '.block__handle' }"
      class="grid">
      <Block
        v-for="(block, index) in blocks"
        :globalEditable="editable"
        :block="block"
        :index="index"
        :key="block.id"
        @deleteBlock="deleteBlock"
        @updateBlocks="updateBlocks"
      />
    </draggable>
    <button
      v-if="editable"
      class="block-preview">
      <span
        @click="addBlock"
        class="icon-wrapper">
        <icon
          name="plus"
          class="icon">
        </icon>
      </span>
    </button>
    <button
      @click="toggleEditable()"
      class="btn-settings">
      <span v-if="editable">Save</span>
      <span v-else>Edit</span>
      <icon
        v-if="editable"
        name="check"
        class="icon">
      </icon>
      <icon
        v-else
        name="cogs"
        class="icon">
      </icon>
    </button>
    <footer
      v-if="editable"
      class="footer">
      <span>made by <a href="https://dreiqbik.de">dreiQBIK</a></span>
    </footer>
  </div>
</template>



<script>
import 'vue-awesome/icons';
import Block from "./components/Block";
import Icon from 'vue-awesome/components/Icon';
import draggable from 'vuedraggable';

export default {

  name: "App",

  components: {
    Block,
    Icon,
    draggable,
  },

  data() {
    return {
      blocks: [],
      editable: false,
    };
  },

  methods: {

    toggleEditable: function() {
      const self = this;
      self.editable = !self.editable;
    },

    addBlock: function() {
      const self = this;
      self.blocks.push({
        id: self.generateUniqueId(),
        blockEditable: true,
      });
    },

    deleteBlock: function(index) {
      const self = this;
      self.blocks.splice(index, 1);
    },

    updateBlocks: function(blockData) {
      const self = this;
      self.blocks.forEach(item => {
        if (item.id === blockData.id) {
          item.blockHeading = blockData.blockHeading;
          item.activeColor = blockData.activeColor;
          item.blockItems = blockData.blockItems;
          item.blockColors = blockData.blockColors;
          item.rowHeight = blockData.rowHeight;
        } else {
          item.blockEditable = false;
        }
      });

      try {
        chrome.storage.sync.set({blocks: self.blocks});
      } catch (error) {
        localStorage.setItem('blocks', JSON.stringify(self.blocks));
      }
    },

    saveData: function() {
      chrome.storage.sync.set({blocks: self.blocks});
    },

    generateUniqueId: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    getData: function() {
      const self = this;
      try {
        chrome.storage.sync.get('blocks', result => {
          if (result.blocks !== undefined && result.blocks.length) self.blocks = result.blocks;
        });
      } catch (error) {
        if (localStorage.getItem('blocks')) {
          self.blocks = JSON.parse(localStorage.getItem('blocks'));
        }
      }

      if (self.blocks !== undefined && self.blocks.length === 0) {
        self.editable = true;
      }
    },
  },

  created() {
    const self = this;
    self.getData();
  },

  watch: {
    blocks: {
      handler() {
        const self = this;
        console.log('blocks changed blocks')
        try {
          chrome.storage.sync.set({blocks: self.blocks});
        } catch (error) {
          localStorage.setItem('blocks', JSON.stringify(self.blocks));
        }

        if (self.blocks !== undefined && self.blocks.length === 0) {
          self.editable = true;
        }
      },
      deep: true
    },
    editable: {
      handler() {
        const self = this;
        console.log('blocks changed editable')
        try {
          chrome.storage.sync.set({blocks: self.blocks});
        } catch (error) {
          localStorage.setItem('blocks', JSON.stringify(self.blocks));
        }

        if (self.blocks !== undefined && self.blocks.length === 0) {
          self.editable = true;
        }
      },
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

$c1-main: #a1a9b3;
$c2-main: #427fb9;
$c1-second: #42b983;
$c1-third: #ee6161;
$c1-fourth: #ecd261;

// fonts
$f1-main: 'Merriweather', 'Times New Roman', serif;
$f1-second: 'Open Sans', 'Helvetica', Arial, sans-serif;

// breakpoints
@mixin b-small {
  @media (min-width: 680px) { @content; }
}
@mixin b-medium {
  @media (min-width: 1000px) { @content; }
}
@mixin b-large {
  @media (min-width: 1530px) { @content; }
}

body {
  font-size: 1rem;
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
  padding: 2.5em 2em 4em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  @include b-medium {
    max-width: 1200px;
  }

  @include b-large {
    max-width: 1480px;
  }
}

.grid {
  display: grid;
  grid-template-columns: minmax(320px, 1fr);
  grid-gap: 1em;

  @include b-small {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }

  @include b-medium {
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }

  @include b-large {
    grid-template-columns: repeat(4, minmax(300px, 1fr));
  }
}

.block-preview {
  background-color: transparent;
  color: $c1-main;
  border: 0;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 2em;

  &:focus {
    outline: 0;
  }

  .icon-wrapper {
    background-color: $c1-main;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:focus {
      outline: 0;
      background-color: darken($c1-main, 10%);
    }

    &:hover {
      background-color: darken($c1-main, 5%);
    }
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
  z-index: 10;
  animation: fadein 0.1s ease-in;

  &:focus {
    outline: 0;
    background-color: darken($c1-main, 10%);
  }

  &:hover {
    background-color: darken($c1-main, 5%);

    span {
      display: flex;
    }
  }

  span {
    display: none;
    align-items: center;
    background-color: $c-white;
    color: $c1-main;
    position: absolute;
    left: -1.5em;
    top: 0;
    bottom: 0;
    transform: translateX(-100%);
    font-family: $f1-second;
    font-weight: bold;
    padding: 0 2em;
    box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.1);

    &:after {
      content: "";
      display: flex;
      position: absolute;
      right: -10px;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid $c-white;
    }
  }

  .icon {
    width: auto;
    height: 25px;
    max-width: 100%;
    max-height: 100%;
  }
}

footer {
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  color: $c1-grey;
  font-family: $f1-second;
  font-weight: bold;

  a {
    color: inherit;
  }
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
