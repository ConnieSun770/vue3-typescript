<template>
<div class="column-detail-page w-75 mx-auto">
  <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
    <div class="col-3 text-center">
      <img :src="getImg(column.avatar)" :alt="column.title" class="rounded-circle w-50 my-3">
    </div>
    <div class="col-9">
      <h4>{{column.title}}</h4>
      <p class="text-muted">{{column.description}}</p>
    </div>
    <div v-if="currentId === myColumnId">
      <router-link to="/create_column" class="btn btn-outline-primary w-25">编辑我的专栏</router-link>
      <router-link to="/create_post" class="btn btn-outline-primary w-25 mx-2">新建文章</router-link>
    </div>
  </div>
  <post-list :list="list" :edit="currentId === myColumnId"/>
</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
export default defineComponent({
  name: 'Column',
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const currentId = +route.params.id
    const store = useStore()
    const column = computed(() => store.getters.getColumnById(currentId))
    const getImg = () => {
      return require('@/assets/column.jpg')
    }
    const list = computed(() => store.getters.getPostsByCId(currentId))
    const myColumnId = store.state.user.columnId
    return {
      column,
      list,
      getImg,
      currentId,
      myColumnId
    }
  }
})
</script>

<style scoped>

</style>
