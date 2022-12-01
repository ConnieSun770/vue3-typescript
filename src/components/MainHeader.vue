<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4 sticky-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#">Vue3 + TS</router-link>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登录</router-link></li>
        <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2" >注册</router-link></li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <dropdown :title="`${user.name?'你好, '+user.name:'你好'}`">
          <dropdown-item :to="hasColumn?'/create_post':'/create_column'">新建文章</dropdown-item>
          <dropdown-item to="/create_column">编辑专栏</dropdown-item>
          <dropdown-item @click="logout">退出登录</dropdown-item>
        </dropdown>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { UserProps } from '@/testData'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import dropdown from '@/components/Dropdown.vue'
import dropdownItem from '@/components/DropdownItem.vue'
export default defineComponent({
  name: 'MainHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  components: {
    dropdown,
    dropdownItem
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const logout = () => {
      store.commit('logout')
      router.push('/')
    }
    const { columnId } = store.state.user
    const hasColumn = computed(() => !store.state.columns.every((c: { _id: number }) => c._id !== columnId))
    return {
      logout,
      hasColumn
    }
  }
})
</script>

<style scoped>

</style>
