import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import LoginComponent from './shared/Login/Login.vue'
import HomeComponent from './shared/Home/Home.vue'
import InsertComponent from './shared/Insert/Insert.vue'
import TakerComponent from './shared/Taker/Taker.vue'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import VueCookies from 'vue-cookies'
import VueWebCam from "vue-web-cam";

Vue.use(VueWebCam)
Vue.use(VueApollo)
Vue.use(VueCookies)

const httpLink = createHttpLink({
  uri: 'http://139.180.132.167:8989/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueRouter)

const routes = [
  // {path: '/login', component: LoginComponent},
  {path: '/home', component: HomeComponent},
  {path: '/', component: HomeComponent},
  // {path: '/insert', component: InsertComponent},
  // {path: '/taker', component: TakerComponent},
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  apolloProvider,
  render: h => h(App)
})
