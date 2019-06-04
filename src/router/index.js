import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/pages/Register.vue'
import Login from '../components/pages/Login.vue'
import Video from '../components/pages/Video.vue'
import Index from '../components/pages/Index.vue'
import Home from '../components/pages/Home.vue'
import Search from '../components/pages/Search'

//二级路由
import userBasic from '../components/pages/userBasic.vue'
import userCollect from '../components/pages/userCollect.vue'
import userUpload from '../components/pages/userUpload.vue'
import AccountModificate from '../components/pages/AccountModificate.vue'

Vue.use(Router)

export const routes =[
  {path:'/',component:Index},
  {path:'/register',component:Register},
  {path:'/login',component:Login},
  {path:'/video',component:Video},
  {path:'/home/:currentUser',component:Home,
  children:[
    {path:'basic',component:userBasic},
    {path:'collect',component:userCollect},
    {path:'upload',component:userUpload},
    {path:'account',component:AccountModificate},
    ]},
  {path:'/videoPlay/:id',component:resolve => require(['../components/pages/videoPlay.vue'],resolve)},
  {path:'/home',component:Home},
  {path:'/search',component:Search}
]
