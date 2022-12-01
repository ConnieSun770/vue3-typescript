export interface ColumnProps {
  _id:number
  title:string
  avatar?:string
  description:string,
  author: string,
  createdAt: string
}

export interface PostProps{
  id:number
  title:string
  content:string
  image?:string
  createdAt:string
  columnId:number
}

export interface UserProps{
  isLogin:boolean;
  name?:string;
  id?:number;
  columnId?:number;
}

// export const testData:ColumnProps[] = [
//   {
//     _id: 1,
//     title: 'test1的专栏',
//     description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧,这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   },
//   {
//     _id: 3,
//     title: 'test3的专栏',
//     description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧,这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   },
//   {
//     _id: 4,
//     title: 'test4的专栏',
//     description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   }
// ]

export const testPost:PostProps[] = [
  {
    id: 101,
    title: '这是我的第一篇文章',
    content: 'Creating a Single-page Application with Vue + Vue Router feels natural: with Vue.js, we are already composing our application with components. When adding Vue Router to the mix, all we need to do is map our components to the routes and let Vue Router know where to render them. Here\'s a basic example:',
    image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0709%252F7689d35dj00qvz7bn001nc000go009dg.jpg%26thumbnail%3D660x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670408021&t=3daed709b60889573254bbd0586e6412',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 102,
    title: '这是我的第二篇文章',
    content: 'Creating a Single-page Application with Vue + Vue Router feels natural: with Vue.js, we are already composing our application with components. When adding Vue Router to the mix, all we need to do is map our components to the routes and let Vue Router know where to render them. Here\'s a basic example...',
    // image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0709%252F7689d35dj00qvz7bn001nc000go009dg.jpg%26thumbnail%3D660x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670408021&t=3daed709b60889573254bbd0586e6412',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 103,
    title: '这是我的第三篇文章',
    content: 'Creating a Single-page Application with Vue + Vue Router feels natural: with Vue.js, we are already composing our application with components. When adding Vue Router to the mix, all we need to do is map our components to the routes and let Vue Router know where to render them. Here\'s a basic example:',
    image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0709%252F7689d35dj00qvz7bn001nc000go009dg.jpg%26thumbnail%3D660x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670408021&t=3daed709b60889573254bbd0586e6412',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 104,
    title: 'test2的专栏',
    content: 'Creating a Single-page Application with Vue + Vue Router feels natural: with Vue.js, we are already composing our application with components. When adding Vue Router to the mix, all we need to do is map our components to the routes and let Vue Router know where to render them. Here\'s a basic example:',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
    createdAt: '2020-06-11 10:34:22',
    columnId: 2
  },
  {
    id: 103,
    title: 'test2的专栏',
    content: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧，这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
    createdAt: '2020-06-11 10:34:22',
    columnId: 3
  }
]

export const testUser:UserProps = {
  isLogin: true,
  id: 1,
  name: 'Connie',
  columnId: 1
}
