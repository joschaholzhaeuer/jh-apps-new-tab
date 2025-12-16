<template>
  <li :key="item.id">
    <span
      v-if="isEditable"
      class="icon-wrapper icon-wrapper--light handle"
    >
      <font-awesome-icon icon="arrows-alt" class="icon" />
    </span>

    <!-- Heading Type -->
    <div v-if="item.type === 'heading'" class="section">
      <input
        v-if="isEditable"
        type="text"
        :value="item.name"
        @input="item.name = $event.target.value; $emit('update')"
        class="section__input"
        :id="`heading-${item.id}`"
        :name="`heading-${item.id}`"
      />
      <span
        v-if="isEditable"
        @click="$emit('remove', item.id)"
        class="icon-wrapper"
      >
        <font-awesome-icon icon="times" class="icon" />
      </span>
      <h3 v-else>{{ item.name }}</h3>
    </div>

    <!-- Link Type -->
    <div v-if="item.type === 'link'" class="section">
      <span
        v-if="isEditable"
        @click="$emit('choose-icon', item.icon, item.id)"
      >
        <font-awesome-icon
          class="icon icon--indicator icon--changeable"
          :icon="item.icon"
        />
      </span>
      <font-awesome-icon
        v-else
        class="icon icon--indicator"
        :icon="item.icon"
      />
      <div v-if="isEditable" class="section section--flex">
        <input
          type="text"
          :value="item.name"
          @input="item.name = $event.target.value; $emit('update')"
          class="section__input section__input--light"
          :id="`link-name-${item.id}`"
          :name="`link-name-${item.id}`"
        />
        <input
          type="text"
          :value="item.link"
          @input="item.link = $event.target.value; $emit('update')"
          class="section__input section__input--light"
          :id="`link-url-${item.id}`"
          :name="`link-url-${item.id}`"
        />
      </div>
      <a v-else :href="item.link" class="link">{{ item.name }}</a>
      <span
        v-if="isEditable"
        @click="$emit('remove', item.id)"
        class="icon-wrapper"
      >
        <font-awesome-icon icon="times" class="icon" />
      </span>
    </div>
  </li>
</template>

<script>
export default {
  name: "BlockItem",

  props: {
    item: {
      type: Object,
      required: true,
      validator: (value) =>
        value.id !== undefined &&
        value.type !== undefined &&
        value.name !== undefined
    },
    isEditable: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["update", "remove", "choose-icon"],
};
</script>

<style scoped lang="scss">
@use "sass:color";

$c-black: #293847;
$c1-grey: #d7dfe9;
$c2-grey: #eaf0f6;
$c-white: #fff;

$c1-main: #a1a9b3;
$f1-main: "Merriweather", "Times New Roman", serif;
$f1-second: "Open Sans", "Helvetica", sans-serif;

li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em 1em;

  &:last-child {
    border-bottom: 0;
  }
}

.section {
  display: flex;
  align-items: center;
  flex-grow: 1;

  &:hover {
    .icon--indicator {
      color: color.adjust($c1-main, $lightness: -10%);
    }

    a {
      color: color.adjust($c1-main, $lightness: -10%);
      text-decoration: underline;
    }
  }

  &--flex {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
  }

  &__input {
    color: $c1-main;
    font-family: $f1-second;
    background-color: transparent;
    border: 1px dashed $c1-grey;
    font-weight: bold;
    font-size: 1rem;
    padding: 0;
    text-align: left;
    text-transform: uppercase;
    flex-grow: 1;
    margin-right: 1em;
    min-width: 0;
    width: 100%;

    &:focus {
      outline: 0;
      border-color: $c1-main;
    }

    &--light {
      font-family: $f1-main;
      font-weight: 300;
      text-transform: none;
    }
  }
}

h3 {
  color: $c1-main;
  margin-top: 1em;
  margin-bottom: 0;
  font-family: $f1-second;
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
}

.link {
  color: $c1-main;
  font-family: $f1-main;
  font-size: 1rem;
  font-weight: 300;
  text-decoration: none;
  flex-grow: 1;
  text-align: left;
}

.icon-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;

  &--light {
    margin-right: 1em;
  }

  .icon {
    width: 16px;
    height: 16px;
    color: $c1-main;
  }
}

.icon--indicator {
  width: 20px;
  height: 20px;
  margin-right: 1em;
  color: $c1-main;

  &--changeable {
    cursor: pointer;
  }
}
</style>
