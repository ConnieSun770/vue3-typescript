<template>
  <div class="validate-input-container mb-2" >
    <label for="exampleInputEmail1" class="form-label">{{title}}</label>
    <input
      v-if="tag === 'input'"
      type="text" class="form-control"
      :class="{'is-invalid':inputRef.error,'is-valid':!inputRef.error && blurRef}"
      id="exampleInputEmail1"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <textarea
      v-else
      type="text" class="form-control"
      :class="{'is-invalid':inputRef.error,'is-valid':!inputRef.error && blurRef}"
      id="exampleInputEmail1"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span :class="{'invalid-transparent':!inputRef.error}" class="invalid-feedback">{{inputRef.message||'1'}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, ref, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,16}$/
interface RuleProp {
  type:'required' | 'email' | 'password' | 'length' | 'dirty'
  message:string,
  max?:number,
  min?:number,
  dirty?:string[]
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    title: {
      type: String,
      required: true
    },
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    let dirtyList: string[] = []
    const blurRef = ref(false)
    const updateValue = (e:KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    const validateInput = ():boolean => {
      blurRef.value = true
      if (props.rules) {
        const allPassed = props.rules.every(rules => {
          let passed = true
          inputRef.message = rules.message
          switch (rules.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = regEmail.test(inputRef.val)
              break
            case 'password':
              passed = regPassword.test(inputRef.val)
              break
            case 'length':
              if (rules.max && rules.min) {
                passed = inputRef.val.length >= rules.min && inputRef.val.length <= rules.max
              } else if (rules.max) {
                passed = inputRef.val.length <= rules.max
              } else if (rules.min) {
                passed = inputRef.val.length >= rules.min
              }
              break
            case 'dirty':
              dirtyList = []
              if (rules.dirty) {
                for (let i = 0; i < rules.dirty.length; i++) {
                  const pattern = new RegExp(rules.dirty[i], 'g')
                  if (pattern.test(inputRef.val)) {
                    dirtyList.push(rules.dirty[i])
                  }
                  // inputRef.val = inputRef.val.replace(pattern, '*')
                }
              }
              passed = (dirtyList.length === 0)
              if (!passed) {
                inputRef.message += dirtyList.join(', ')
              }
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      blurRef,
      updateValue
    }
  }
})
</script>

<style  scoped>
.invalid-transparent{
  opacity: 0;
  display: block;
}
</style>
