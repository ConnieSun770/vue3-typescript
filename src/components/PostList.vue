<template>
<div class="post-list">
  <article v-for="post in list" :key="post.id" class="card mb-3 shadow-sm">git remote add origin
    <div class="card-body ">
      <h4>{{post.title}}</h4>
      <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img :src="post.image" :alt="post.title" class="w-75 h-100">
          </div>
          <p :class="{'col-9': post.image}">{{post.content}}</p>
      </div>
      <div class="d-flex justify-content-between">
        <div  class="text-muted">{{post.createdAt}}</div>
        <div v-if="edit">
          <div class="btn btn-outline-danger" @click="deletePost(post.id)">删除</div>
        </div>
      </div>
    </div>
  </article>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '@/testData'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const store = useStore()
    const deletePost = (id: number) => {
      store.commit('deletePost', id)
    }
    return {
      deletePost
    }
  }
})
</script>

<style scoped>

</style>
