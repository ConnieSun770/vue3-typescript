<template>
<div>
  <validate-form @form-submit="onFormSubmit">
    <validate-input
      id="article-title-input" title="专栏标题"
      placeholder="请输入专栏标题" type="text"
      v-model="title" :rules="[{type:'required',message:'标题不能为空'},{type:'length',message:'长度不能超过20',max:20}]"
    />
    <validate-input
      id="article-content-input" title="专栏详情"
      placeholder="请输入专栏详情" type="text"
      v-model="description" tag="textarea"
      :rules="[{type:'required',message:'内容不能为空'},{type:'dirty',message:'包含敏感词:',dirty: ['狗', '草', '傻比', '尼玛', 'shit']}]"
      rows="10"
    />
    <template #submit>
      <button type="submit" class="btn btn-primary">Submit</button>
    </template>
  </validate-form>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import validateInput from '@/components/ValidateInput.vue'
import validateForm from '@/components/ValidateForm.vue'
import { ColumnProps } from '@/testData'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { StoreDataProps } from '@/store'
export default defineComponent({
  name: 'CreateColumn',
  components: {
    validateInput,
    validateForm
  },
  setup () {
    const router = useRouter()
    const store = useStore<StoreDataProps>()
    const title = ref('')
    const { columnId, name } = store.state.user
    const description = ref('')
    if (store.getters.hasColumnId(columnId)) {
      const oldColumn = store.getters.getColumnById(columnId)
      title.value = oldColumn.title
      description.value = oldColumn.description
    }
    const onFormSubmit = (result: boolean) => {
      if (result) {
        if (columnId && name) {
          const newColumn:ColumnProps = {
            _id: columnId,
            title: title.value,
            description: description.value,
            avatar: 'column.jpg',
            author: name,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createColumn', newColumn)
          router.push({ name: 'column', params: { id: columnId } })
          router.go(1)
        }
      }
    }
    return {
      title,
      description,
      onFormSubmit
    }
  }
})
</script>

<style scoped>

</style>
