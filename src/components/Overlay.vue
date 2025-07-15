<template>
  <div :class="{ rounded: styleRounded }" class="overlay">
    <ul>
      <li v-for="icon in icons" :key="icon.id">
        <span
          @click="selectIcon(icon.id)"
          :class="[{ isSelected: icon.selected }, activeColor]"
          class="icon-wrapper"
        >
          <font-awesome-icon :icon="icon.name" class="icon" />
        </span>
      </li>
    </ul>
    <button
      v-if="selectedItemId !== ''"
      @click="$emit('setIcon', selectedItemName, selectedItemId)"
    >
      Change Icon
    </button>
    <button v-else @click="$emit('setIcon', selectedItemName, '')">
      Choose Icon
    </button>
  </div>
</template>

<script>
let nextIconId = 1;

export default {
  name: "Overlay",

  components: {},

  props: ["activeColor", "styleRounded", "currentIcon", "selectedItemId"],

  data() {
    return {
      selectedItemName: "",
      icons: [
        {
          id: nextIconId++,
          name: "tag",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "envelope",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "desktop",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "headphones",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "hashtag",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "calendar",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "file",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "briefcase",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "server",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "train",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "cutlery",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "comment",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "tv",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "credit-card",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "heart",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "link",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "anchor",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "arrow-right",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "music",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "play",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "rss",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "book",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "folder",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "shopping-bag",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "globe",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "key",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "star",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "cog",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "bed",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "bell",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "ambulance",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "cloud",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "asterisk",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "beer",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "book",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "bookmark",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "bug",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "camera",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "car",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "check",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "clipboard",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "code",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "coffee",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "cube",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "database",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "edit",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "flag",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "eye",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "female",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "male",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "folder-open",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "home",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "gift",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "id-card",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "image",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "microphone",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "lock",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "shopping-cart",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "phone",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "question",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "search",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "shield",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "tint",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "tree",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "trash",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "trophy",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "user",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "wifi",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "wrench",
          selected: false,
        },
        {
          id: nextIconId++,
          name: "users",
          selected: false,
        },
      ],
    };
  },

  methods: {
    selectIcon(idToSelect) {
      var self = this;

      // deselect currently selected item
      self.icons.filter((item) => {
        if (item.selected) {
          item.selected = false;
        }
      });

      // select clicked item
      self.icons.filter((item) => {
        if (item.id === idToSelect) {
          item.selected = true;
          self.selectedItemName = item.name;
        }
      });
    },

    setCurrentIcon() {
      const self = this;
      const iconToSelect = self.icons.find((icon) => {
        return icon.name === self.currentIcon;
      });
      if (iconToSelect) {
        iconToSelect.selected = true;
        self.selectedItemName = iconToSelect.name;
      }
    },
  },

  created() {
    this.setCurrentIcon();
  },
};
</script>

<style scoped lang="scss">
@use "sass:color";

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
$f1-main: "Merriweather", "Times New Roman", serif;
$f1-second: "Open Sans", "Helvetica", sans-serif;

.overlay {
  position: absolute;
  left: 1em;
  right: 1em;
  top: 1em;
  bottom: 1em;
  z-index: 5;
  background-color: $c-white;
  color: $c1-main;
  font-family: $f1-second;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.15);
  padding: 1.5em;

  &.rounded {
    border-radius: 10px;

    button {
      border-radius: 5px;
    }
  }
}

ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  max-height: calc(100% - 30px);
  overflow-y: scroll;
}

li {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;

  span {
    display: flex;
    cursor: pointer;
    padding: 9px;
    border-radius: 50%;
    position: relative;

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
      }
    }

    &:hover {
      background-color: color.adjust($c1-main, $lightness: -5%);
      box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.2);

      .icon {
        color: $c-white;
      }
    }

    .icon {
      width: 16px;
      height: 16px;
    }
  }
}

button {
  color: $c-white;
  background-color: $c1-main;
  font-family: $f1-second;
  border: 0;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5em 1.7em;
  align-self: flex-start;
  margin-bottom: 0;
  width: auto;
  box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.2);

  &:focus {
    outline: 0;
    background-color: color.adjust($c1-main, $lightness: -10%);
  }

  &:hover {
    background-color: color.adjust($c1-main, $lightness: -5%);
  }
}
</style>
