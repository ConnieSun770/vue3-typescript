<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="getImg()"  alt="头像" class="rounded-circle border border-light w-25 my-3">
          <h5>{{column.title}}</h5>
          <p class="card-text text-lg-start">{{column.description}}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
export interface ColumnProps{
  id:number;
  title:string;
  avatar?:string;
  description:string;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.jpg')
        }
        return column
      })
    })
    const getImg = () => {
      return require('@/assets/column.jpg')
    }
    return {
      columnList,
      getImg
    }
  }
})
</script>

<style scoped>

</style>
