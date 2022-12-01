import { createStore } from 'vuex'
import { ColumnProps, UserProps, PostProps } from '@/testData'
import axios from 'axios'
export interface StoreDataProps {
  user: UserProps,
  posts: PostProps[],
  columns: ColumnProps[],
  hasColumn: boolean
}

const PREFIX = 'my_project_'
export const setStorage = (key: string, value: any) => {
  try {
    if (!value) value = null
    const data = JSON.stringify(value)
    sessionStorage.setItem(PREFIX + key, data)
  } catch (err) {
    console.error(`Error set ${PREFIX + key}`)
  }
}
export const getStorage = (key: string) => {
  if (!key) return null
  try {
    const storageStr = sessionStorage.getItem(PREFIX + key)
    if (!storageStr || JSON.stringify(storageStr) === 'null') return null
    return JSON.parse(storageStr)
  } catch (err) {
    console.error(`Error get ${PREFIX + key}`)
  }
}
export const removeStorage = (key: string) => {
  sessionStorage.removeItem(PREFIX + key)
}

const store = createStore<StoreDataProps>({
  state: {
    user: getStorage('VUE3_TS_LOGIN') || { isLogin: false },
    posts: getStorage('VUE3_TS_POSTS') || [],
    columns: getStorage('VUE3_TS_COLUMNS') || [],
    hasColumn: false
  },
  mutations: {
    login (state, username) {
      state.user = { ...state.user, isLogin: true, name: username, columnId: 1 }
      setStorage('VUE3_TS_LOGIN', state.user)
    },
    logout (state) {
      removeStorage('VUE3_TS_LOGIN')
      state.user = { isLogin: false }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
      setStorage('VUE3_TS_POSTS', state.posts)
    },
    deletePost (state, id) {
      state.posts = state.posts.filter((p) => p.id !== id)
      setStorage('VUE3_TS_POSTS', state.posts)
    },
    createColumn (state, newColumn) {
      let temp = getStorage('VUE3_TS_COLUMNS')
      if (!state.columns.every(c => c._id !== newColumn._id)) {
        temp = temp.filter((c:ColumnProps) => c._id !== newColumn._id)
        temp.push(newColumn)
        state.columns = temp
        setStorage('VUE3_TS_COLUMNS', temp)
      } else {
        state.columns.push(newColumn)
        setStorage('VUE3_TS_COLUMNS', [...temp, newColumn])
      }
    },
    getColumns (state, rawData) {
      state.columns = rawData.data.list
      setStorage('VUE3_TS_COLUMNS', rawData.data.list)
    },
    getPosts (state, rawData) {
      state.posts = rawData.data.list
      setStorage('VUE3_TS_POSTS', rawData.data.list)
    }
  },
  actions: {
    async getColumns ({ commit }) {
      const res = await axios.get('/columns')
      commit('getColumns', res.data)
    },
    async getPosts ({ commit }) {
      const res = await axios.get('/posts')
      commit('getPosts', res.data)
    }
  },
  getters: {
    biggerColumnsLen: (state) => () => {
      return state.columns.filter(c => c._id > 2).length
    },
    getColumnById: (state) => (id:number) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCId: (state) => (cid:number) => {
      return state.posts.filter(p => p.columnId === cid)
    },
    hasColumnId: (state) => (id:number) => {
      return !state.columns.every(c => c._id !== id)
    }
  }
})

export default store
