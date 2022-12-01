const Mock = require('mockjs')
// Mock.mock  接口，请求方式，返回数据（数据就是json文件夹中的文件自行添加）
Mock.mock('/user/list', 'get', require('./json/userList'))
Mock.mock('api/login', 'get', {
  code: 0,
  msg: '登录成功',
  data: {
    token: 'joaaohiefuopieeaskfoefeop'
  }
})
// Mock.mock('/columns', 'get', require('./json/userList'))
Mock.mock('/columns', 'get', require('./json/columns.json'))
Mock.mock('/posts', 'get', require('./json/posts.json'))
export default Mock
