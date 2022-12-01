<template>
<div>
  <validate-form @form-submit="onFormSubmit">
    <validate-input
      id="email-input"
      title="用户名" :rules="usernameRules" v-model="usernameVal"
      placeholder="请输入用户名" type="text"
    />
    <validate-input
      id="email-input"
      title="邮箱地址" :rules="emailRules" v-model="emailVal"
      placeholder="请输入邮箱地址" type="text"
    />
    <validate-input
      id="password-input"
      title="密码" :rules="passwordRules" v-model="passwordVal"
      placeholder="请输入密码" type="password"
    />
    <template #submit>
      <button type="submit" class="btn btn-primary">Submit</button>
    </template>
  </validate-form>
</div>
</template>

<script lang="ts">
import validateForm from '@/components/ValidateForm.vue'
import validateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Login',
  components: {
    validateForm,
    validateInput
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const usernameVal = ref('')
    const usernameRules:RulesProp = [
      { type: 'required', message: '用户名不能为空' },
      { type: 'length', message: '用户名长度不能超过10个字', max: 10 },
      { type: 'dirty', message: '包含敏感词:' }
    ]
    const emailVal = ref('')
    const emailRules:RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' },
      { type: 'email', message: '邮箱地址格式不正确' }
    ]
    const passwordVal = ref('')
    const passwordRules:RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'password', message: '密码格式不正确,字母和数字组合，长度在8-16之间' }
    ]
    const onFormSubmit = (result: any) => {
      if (result) {
        store.commit('login', usernameVal.value)
        router.push('/')
      }
    }
    return {
      usernameVal,
      usernameRules,
      emailRules,
      passwordRules,
      emailVal,
      passwordVal,
      onFormSubmit
    }
  }
}
</script>

<style scoped>

</style>
