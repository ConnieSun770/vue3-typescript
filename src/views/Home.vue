<template>
<div>
  <columnList :list="list"/>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import columnList from '@/components/ColumnList.vue'
import { getStorage } from '@/store'

export default defineComponent({
  name: 'Home',
  components: {
    columnList
  },
  setup () {
    const store = useStore()
    const biggerColumnLen = computed(() => store.getters.biggerColumnsLen)
    onMounted(() => {
      if (!getStorage('VUE3_TS_POSTS')) {
        store.dispatch('getPosts')
      }
      if (!getStorage('VUE3_TS_COLUMNS')) {
        store.dispatch('getColumns')
      }
    })
    const list = computed(() => store.state.columns)
    return {
      list: list,
      biggerColumnLen
    }
  }
})
</script>

<style scoped>

</style>
