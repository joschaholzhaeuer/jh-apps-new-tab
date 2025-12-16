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
export default {
  name: "Overlay",

  props: {
    activeColor: {
      type: String,
      required: true,
    },
    styleRounded: {
      type: Boolean,
      default: true,
    },
    currentIcon: {
      type: String,
      default: "tag",
    },
    selectedItemId: {
      type: String,
      default: "",
    },
  },

  data() {
    let iconId = 0;
    return {
      selectedItemName: "",
      icons: [
        {
          id: ++iconId,
          name: "tag",
          selected: false,
        },
        {
          id: ++iconId,
          name: "envelope",
          selected: false,
        },
        {
          id: ++iconId,
          name: "desktop",
          selected: false,
        },
        {
          id: ++iconId,
          name: "headphones",
          selected: false,
        },
        {
          id: ++iconId,
          name: "hashtag",
          selected: false,
        },
        {
          id: ++iconId,
          name: "calendar",
          selected: false,
        },
        {
          id: ++iconId,
          name: "file",
          selected: false,
        },
        {
          id: ++iconId,
          name: "briefcase",
          selected: false,
        },
        {
          id: ++iconId,
          name: "server",
          selected: false,
        },
        {
          id: ++iconId,
          name: "train",
          selected: false,
        },
        {
          id: ++iconId,
          name: "cutlery",
          selected: false,
        },
        {
          id: ++iconId,
          name: "comment",
          selected: false,
        },
        {
          id: ++iconId,
          name: "tv",
          selected: false,
        },
        {
          id: ++iconId,
          name: "credit-card",
          selected: false,
        },
        {
          id: ++iconId,
          name: "heart",
          selected: false,
        },
        {
          id: ++iconId,
          name: "link",
          selected: false,
        },
        {
          id: ++iconId,
          name: "anchor",
          selected: false,
        },
        {
          id: ++iconId,
          name: "arrow-right",
          selected: false,
        },
        {
          id: ++iconId,
          name: "music",
          selected: false,
        },
        {
          id: ++iconId,
          name: "play",
          selected: false,
        },
        {
          id: ++iconId,
          name: "rss",
          selected: false,
        },
        {
          id: ++iconId,
          name: "book",
          selected: false,
        },
        {
          id: ++iconId,
          name: "folder",
          selected: false,
        },
        {
          id: ++iconId,
          name: "shopping-bag",
          selected: false,
        },
        {
          id: ++iconId,
          name: "globe",
          selected: false,
        },
        {
          id: ++iconId,
          name: "key",
          selected: false,
        },
        {
          id: ++iconId,
          name: "star",
          selected: false,
        },
        {
          id: ++iconId,
          name: "cog",
          selected: false,
        },
        {
          id: ++iconId,
          name: "bed",
          selected: false,
        },
        {
          id: ++iconId,
          name: "bell",
          selected: false,
        },
        {
          id: ++iconId,
          name: "ambulance",
          selected: false,
        },
        {
          id: ++iconId,
          name: "cloud",
          selected: false,
        },
        {
          id: ++iconId,
          name: "asterisk",
          selected: false,
        },
        {
          id: ++iconId,
          name: "beer",
          selected: false,
        },
        {
          id: ++iconId,
          name: "bookmark",
          selected: false,
        },
        {
          id: ++iconId,
          name: "bug",
          selected: false,
        },
        {
          id: ++iconId,
          name: "camera",
          selected: false,
        },
        {
          id: ++iconId,
          name: "car",
          selected: false,
        },
        {
          id: ++iconId,
          name: "check",
          selected: false,
        },
        {
          id: ++iconId,
          name: "clipboard",
          selected: false,
        },
        {
          id: ++iconId,
          name: "code",
          selected: false,
        },
        {
          id: ++iconId,
          name: "coffee",
          selected: false,
        },
        {
          id: ++iconId,
          name: "cube",
          selected: false,
        },
        {
          id: ++iconId,
          name: "database",
          selected: false,
        },
        {
          id: ++iconId,
          name: "edit",
          selected: false,
        },
        {
          id: ++iconId,
          name: "flag",
          selected: false,
        },
        {
          id: ++iconId,
          name: "eye",
          selected: false,
        },
        {
          id: ++iconId,
          name: "female",
          selected: false,
        },
        {
          id: ++iconId,
          name: "male",
          selected: false,
        },
        {
          id: ++iconId,
          name: "folder-open",
          selected: false,
        },
        {
          id: ++iconId,
          name: "home",
          selected: false,
        },
        {
          id: ++iconId,
          name: "gift",
          selected: false,
        },
        {
          id: ++iconId,
          name: "id-card",
          selected: false,
        },
        {
          id: ++iconId,
          name: "image",
          selected: false,
        },
        {
          id: ++iconId,
          name: "microphone",
          selected: false,
        },
        {
          id: ++iconId,
          name: "lock",
          selected: false,
        },
        {
          id: ++iconId,
          name: "shopping-cart",
          selected: false,
        },
        {
          id: ++iconId,
          name: "phone",
          selected: false,
        },
        {
          id: ++iconId,
          name: "question",
          selected: false,
        },
        {
          id: ++iconId,
          name: "search",
          selected: false,
        },
        {
          id: ++iconId,
          name: "shield",
          selected: false,
        },
        {
          id: ++iconId,
          name: "tint",
          selected: false,
        },
        {
          id: ++iconId,
          name: "tree",
          selected: false,
        },
        {
          id: ++iconId,
          name: "trash",
          selected: false,
        },
        {
          id: ++iconId,
          name: "trophy",
          selected: false,
        },
        {
          id: ++iconId,
          name: "user",
          selected: false,
        },
        {
          id: ++iconId,
          name: "wifi",
          selected: false,
        },
        {
          id: ++iconId,
          name: "wrench",
          selected: false,
        },
        {
          id: ++iconId,
          name: "users",
          selected: false,
        },
      ],
    };
  },

  methods: {
    selectIcon(idToSelect) {
      // Deselect all icons
      this.icons.forEach((icon) => (icon.selected = false));

      // Select clicked icon
      const selectedIcon = this.icons.find((icon) => icon.id === idToSelect);
      if (selectedIcon) {
        selectedIcon.selected = true;
        this.selectedItemName = selectedIcon.name;
      }
    },

    setCurrentIcon() {
      const iconToSelect = this.icons.find(
        (icon) => icon.name === this.currentIcon
      );
      if (iconToSelect) {
        iconToSelect.selected = true;
        this.selectedItemName = iconToSelect.name;
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
