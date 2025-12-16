<template>
  <header
    :class="[activeColor, { rounded: styleRounded }]"
    class="block__header block__handle"
  >
    <span v-if="globalEditable" class="icon-wrapper icon-wrapper--drag handle">
      <font-awesome-icon icon="arrows-alt" class="icon" />
    </span>
    <input
      v-if="globalEditable && blockEditable"
      type="text"
      placeholder="Heading"
      :value="heading"
      @input="$emit('update:heading', $event.target.value)"
      :id="`block-heading-${blockId}`"
      :name="`block-heading-${blockId}`"
    />
    <h2 v-else :class="{ isCentered: globalEditable }">{{ heading }}</h2>
    <span
      v-if="globalEditable && !showIcons"
      @click="$emit('delete')"
      class="icon-wrapper icon-wrapper--close icon-wrapper--red"
    >
      <font-awesome-icon icon="times" class="icon" />
    </span>
    <div v-if="globalEditable && blockEditable" class="colors">
      <ul>
        <li
          v-for="color in colors"
          :key="color.id"
          :class="'color--' + color.name"
          :data-selected="color.selected"
          @click="$emit('color-change', color.id)"
          class="color"
        >
          <font-awesome-icon
            v-if="color.selected"
            icon="check"
            class="icon icon--colored"
          />
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "BlockHeader",

  props: {
    blockId: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      default: "",
    },
    activeColor: {
      type: String,
      default: "green",
    },
    colors: {
      type: Array,
      required: true,
    },
    globalEditable: {
      type: Boolean,
      required: true,
    },
    blockEditable: {
      type: Boolean,
      required: true,
    },
    styleRounded: {
      type: Boolean,
      default: true,
    },
    showIcons: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:heading", "delete", "color-change"],
};
</script>

<style scoped lang="scss">
@use "sass:color";

$c-black: #293847;
$c1-grey: #d7dfe9;
$c2-grey: #eaf0f6;
$c-white: #fff;

$c1-main: #a1a9b3;
$c2-main: #427fb9;
$c1-second: #42b983;
$c1-third: #ee6161;
$c1-fourth: #ecd261;

$f1-second: "Open Sans", "Helvetica", sans-serif;

.block__header {
  background-color: $c1-second;
  color: $c-white;
  padding: 1em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  min-height: 3.5em;
  gap: 0.5em;

  &.rounded {
    border-radius: 10px 10px 0 0;
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

  input {
    color: $c-white;
    font-family: $f1-second;
    background-color: transparent;
    border: 1px dashed rgba($c-white, 0.3);
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
    padding: 0.3em 0.5em;
    flex: 1;
    min-width: 0;

    &::placeholder {
      color: rgba($c-white, 0.3);
    }

    &:focus {
      outline: 0;
      border-color: $c-white;
    }
  }
}

h2 {
  font-size: 1.1rem;
  flex: 1;
  min-width: 0;
  min-height: 24px;
  margin: 0;
  font-weight: bold;
}

.colors {
  position: absolute;
  top: 62px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  padding: 0.4em;
  border-radius: 4px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 0.3em;
  }

  li {
    cursor: pointer;
    display: flex;
    position: relative;

    .icon--colored {
      color: $c-white;
      width: 10px;
      height: 10px;
    }
  }
}

.color {
  width: 1.3em;
  height: 1.3em;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  position: relative;
  border: 2px solid $c-white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &--green {
    background-color: $c1-second;
    
    &:hover {
      background-color: $c1-second;
    }
  }

  &--blue {
    background-color: $c2-main;
    
    &:hover {
      background-color: $c2-main;
    }
  }

  &--yellow {
    background-color: $c1-fourth;
    
    &:hover {
      background-color: $c1-fourth;
    }
  }

  &--red {
    background-color: $c1-third;
    
    &:hover {
      background-color: $c1-third;
    }
  }
}

.icon-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  .icon {
    width: 20px;
    height: 20px;
  }

  &--drag {
    // Gap handled by parent flex
  }

  &--close {
    // Gap handled by parent flex
  }

  &--red:hover .icon {
    color: $c1-third;
  }
}
</style>
