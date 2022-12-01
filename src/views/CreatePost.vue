<template>
<div>
  <validate-form @form-submit="onFormSubmit">
    <validate-input
      id="article-title-input" title="文章标题"
      placeholder="请输入文章标题" type="text"
      v-model="articleTitle" :rules="[{type:'required',message:'标题不能为空'},{type:'length',message:'长度不能超过20',max:20}]"
    />
    <validate-input
      id="article-content-input" title="文章内容"
      placeholder="请输入文章内容" type="text"
      v-model="articleContent" tag="textarea"
      :rules="[{type:'required',message:'内容不能为空'},{type:'dirty',message:'包含敏感词:', dirty:['狗', '草', '傻比', '尼玛', 'shit']}]"
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
import validateForm from '@/components/ValidateForm.vue'
import validateInput from '@/components/ValidateInput.vue'
import { StoreDataProps } from '@/store'
import { PostProps } from '@/testData'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'CreatePost',
  components: {
    validateForm,
    validateInput
  },
  setup () {
    const router = useRouter()
    const store = useStore<StoreDataProps>()
    const articleTitle = ref('')
    const articleContent = ref('')
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost:PostProps = {
            id: new Date().getTime(),
            title: articleTitle.value,
            content: articleContent.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }
    return {
      articleTitle,
      articleContent,
      onFormSubmit
    }
  }
})
</script>

<style scoped>

</style>
