<template>
  <div class="overlay">
    <ul>
      <li
        v-for="icon in icons"
        :key="icon.id">
        <span
          @click="selectIcon(icon.id)"
          :class="[{ isSelected: icon.selected }, activeColor]"
          class="icon-wrapper">
          <icon
            :name="icon.name"
            class="icon">
          </icon>
        </span>
      </li>
    </ul>
    <button
      @click="$emit('setIcon', selectedItemName)">
      Icon auswählen
    </button>
  </div>
</template>

<script>
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

let nextIconId = 1;

export default {

  name: 'Overlay',

  components: {
    Icon,
  },

  props: [
    'activeColor',
  ],

  data() {
    return {
      selectedItemName: '',
      icons: [
        {
          id: nextIconId++,
          name: 'anchor',
          selected: true,
        },
        {
          id: nextIconId++,
          name: 'envelope',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'desktop',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'headphones',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'hashtag',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'calendar',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'file',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'briefcase',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'server',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'train',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'cutlery',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'comment',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'tv',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'credit-card',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'heart',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'link',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'tag',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'arrow-right',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'music',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'play',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'rss',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'book',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'folder',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'shopping-bag',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'globe',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'key',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'star',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'cog',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'bed',
          selected: false,
        },
        {
          id: nextIconId++,
          name: 'bell',
          selected: false,
        },
      ],
    };
  },

  methods: {

    selectIcon: function(idToSelect) {
      var self = this;

      // deselect currently selected item
      self.icons.filter(item => {
        if (item.selected) { item.selected = false };
      });

      // select clicked item
      self.icons.filter(item => {
        if (item.id === idToSelect) {
          item.selected = true;
          self.selectedItemName = item.name;
        };
      });
    },
  },

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

.overlay {
  position: absolute;
  left: 1em;
  right: 1em;
  bottom: 1.5em;
  z-index: 5;
  background: $c-white;
  color: $c1-main;
  font-family: $f1-second;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.1);
  padding: 2.5em 1.5em 2em;
}

ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

li {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5em;

  span {
    display: flex;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;

    &.isSelected {
      background-color: $c1-main;
      box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.2);

      &.green {
        background-color: $c1-second;
      }

      &.blue {
        background-color: $c2-main;
      }

      &.yellow {
        background-color: $c1-fourth;
      }

      &.red {
        background-color: $c1-third;
      }

      .icon {
        color: $c-white;
        width: 14px;
        height: 14px;
      }
    }

    &:hover {
      background-color: darken($c1-main, 5%);
      box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.2);

      .icon {
        color: $c-white;
        width: 14px;
        height: 14px;
      }
    }
  }

}

button {
  color: $c-white;
  background-color: $c1-main;
  font-family: $f1-second;
  border: 0;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.5em 1.7em;
  align-self: flex-start;
  margin-bottom: 0;
  width: auto;
  box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.2);

  &:focus {
    outline: 0;
    background-color: darken($c1-main, 10%);
  }

  &:hover {
    background-color: darken($c1-main, 5%);
  }
}
</style>
