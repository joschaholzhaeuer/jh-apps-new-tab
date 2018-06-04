<template>
  <div id="app">
    <Block
      v-for="block in numberOfBlocks"
      :key="block.id"
    />
  </div>
</template>

<script>
import Block from './components/Block';

export default {
  name: 'App',
  components: {
    Block
  },
  data() {
    return {
      numberOfBlocks: 2
    }
  }
};
</script>

<style lang="scss">

body {
  margin: 0;
  background-color: #F2F4F6;
}

#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F2F4F6;
  padding: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1em;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
