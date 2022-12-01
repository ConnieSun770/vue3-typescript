<template>
  <li class="dropdown-option">
    <router-link :to="to" class="dropdown-item text-center" :class="{'is-disabled':disabled}">
      <slot></slot>
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>
.dropdown-item.is-disabled{
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
