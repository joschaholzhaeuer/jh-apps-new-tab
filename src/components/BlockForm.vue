<template>
  <div>
    <div class="tab">
      <span
        @click="switchTab('item')"
        :class="{ 'is-active': activeTab === 'item' }"
        class="tab__item"
      >
        Links
      </span>
      <span
        @click="switchTab('heading')"
        :class="{ 'is-active': activeTab === 'heading' }"
        class="tab__item"
      >
        Group
      </span>
    </div>

    <!-- Link Form -->
    <form
      v-if="activeTab === 'item'"
      @submit.prevent="submitLink"
      class="form-link"
    >
      <div>
        <span @click="$emit('choose-icon', newItem.icon || 'tag', '')" class="btn">
          <font-awesome-icon :icon="newItem.icon || 'tag'" class="icon" />
        </span>
        <input
          type="text"
          v-model="newItem.name"
          placeholder="Name"
          :id="`new-link-name-${blockId}`"
          name="new-link-name"
        />
      </div>
      <input
        type="text"
        v-model="newItem.link"
        placeholder="Link URL"
        :id="`new-link-url-${blockId}`"
        name="new-link-url"
      />
      <input type="submit" value="Add" name="add-link-submit" />
    </form>

    <!-- Heading Form -->
    <form
      v-if="activeTab === 'heading'"
      @submit.prevent="submitHeading"
      class="form-heading"
    >
      <input
        type="text"
        v-model="newItem.name"
        placeholder="Name"
        :id="`new-heading-name-${blockId}`"
        name="new-heading-name"
      />
      <input type="submit" value="Add" name="add-heading-submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "BlockForm",

  props: {
    blockId: {
      type: String,
      required: true,
    },
  },

  emits: ["add-item", "choose-icon"],

  data() {
    return {
      activeTab: "item",
      newItem: {},
    };
  },

  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },

    submitLink() {
      if (!this.newItem.name?.trim() || !this.newItem.link?.trim()) {
        return;
      }

      this.$emit("add-item", {
        type: "link",
        name: this.newItem.name.trim(),
        link: this.newItem.link.trim(),
        icon: this.newItem.icon || "tag",
      });

      this.clearForm();
    },

    submitHeading() {
      if (!this.newItem.name?.trim()) {
        return;
      }

      this.$emit("add-item", {
        type: "heading",
        name: this.newItem.name.trim(),
      });

      this.clearForm();
    },

    clearForm() {
      this.newItem = {};
    },

    setIcon(iconName) {
      this.newItem.icon = iconName;
    },
  },
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

.tab {
  display: flex;
  justify-content: flex-start;

  &__item {
    background-color: transparent;
    border: 1px solid $c2-grey;
    border-bottom: 0;
    color: $c1-main;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5em 2em;
    margin-right: 0.5em;
    cursor: pointer;

    &.is-active {
      background-color: $c2-grey;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  background-color: $c2-grey;

  input {
    color: $c1-main;
    font-family: $f1-main;
    font-size: 1rem;
    font-weight: 300;
    padding: 0.5em 0.9em;
    margin-bottom: 0.5em;
    border: 1px solid $c1-grey;
    text-align: left;
    flex-grow: 1;

    &:focus {
      outline: 0;
      border-color: $c1-main;
    }

    &::placeholder {
      font-family: $f1-second;
      color: $c1-grey;
      font-weight: bold;
    }
  }

  input[type="submit"],
  .btn {
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

  .btn {
    display: flex;
    align-items: center;
    align-self: stretch;
    padding: 0.5em 0.7em;
    margin-right: 0.5em;
  }

  div {
    margin-bottom: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      margin-bottom: 0;
      min-width: 0;
      flex: 1;
    }
  }
}
</style>
