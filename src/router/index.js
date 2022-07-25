import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import Home from '../views/Home.vue'
import Login from '../views/user/Login.vue'
import OwnProfile from '../views/user/OwnProfile.vue'
import profileView from '../views/user/profileView.vue'
import editProfile from '../views/user/editProfile.vue'
import VerifyEmail from '../views/user/EmailVerifiaction.vue'
import HomeBlog from '../views/blog/HomeBlog.vue'
import PostShow from '../views/blog/postView.vue'
import AdmonHome from '../views/admin/adminHome.vue'
import AdminBlog from '../views/admin/adminBlog.vue'
import AdminBlogCreate from '../views/admin/AdminBlogCreate.vue'
import AdminData from '../views/admin/WebData.vue'
import AdminUsers from '../views/admin/users/adminUsers.vue'
import TweetHome from '../views/tweet/tweetHome.vue'
import testForm from '../views/test/test.vue'

// Errors
import NotFound from '../views/errors/404.vue'

Vue.use(Meta)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: OwnProfile
  },
  {
    path: '/profile/:username',
    name: 'profileView',
    component: profileView
  },
  {
    path: '/edit-profile',
    name: 'editProfile',
    component: editProfile
  },
  {
    path: '/verifyEmail',
    name: 'VerifyEmail',
    component: VerifyEmail
  },
  {
    path: '/blog',
    name: 'Blog',
    component: HomeBlog
  },
  {
    path: '/blog/:slug',
    name: 'PostView',
    component: PostShow
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdmonHome
  },
  {
    path: '/admin/blog',
    name: 'AdminBlog',
    component: AdminBlog
  },
  {
    path: '/admin/data',
    name: 'Admin-data',
    component: AdminData
  },
  {
    path: '/admin/blog/create',
    name: 'newPost',
    component: AdminBlogCreate
  },
  {
    path: '/admin/users',
    name: 'Admin-Users',
    component: AdminUsers
  },
  {
    path: '/tweet',
    name: 'Tweet',
    component: TweetHome
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // to delete
  {
    path: '/form',
    name: 'Form',
    component: testForm
  },
  // 404
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
