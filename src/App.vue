<template>
  <div class="container">
    <main-header :user="userInfo"/>
    <h1 v-if="isLoading">正在读取</h1>
    <router-view></router-view>
    <footer class="text-center pt-4 pb-4 text-secondary bg-light">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2022 Vue3+TS</li>
          <li class="list-inline-item">教程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import mainHeader from '@/components/MainHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    mainHeader
  },
  setup () {
    const store = useStore()
    const userInfo = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      userInfo,
      isLoading
    }
  }
})
</script>

<style scoped>
.container{
  height: 100vh;
  overflow: scroll;
}

</style>
