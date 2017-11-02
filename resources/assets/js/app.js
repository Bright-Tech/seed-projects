/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * 自定义组件
 */
window.ModelDataSource = require('./libs/ModelDataSource');
Vue.use(ModelDataSource);
window.ListDataSource = require('./libs/ListDataSource');
Vue.use(ListDataSource);

/**
 * Vue Router
 */
import VueRouter from 'vue-router';
import {routers} from './router/router';
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

const router = new VueRouter(RouterConfig);

/**
 * Vuex
 */
import store from './store';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

/**
 * 引入iview组件库
 */
import iView from 'iview';
Vue.use(iView);

/**
 * 路由全局钩子
 */
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  store.commit('setTitle', to.meta.title);
  if (to.name !== 'error_404') {
    if (to.path === '/') {
      next({
        name: 'home_index'
      })
    } else if (to.name === 'login') {
      store.commit('setAuthRedirectUrl', from.path);
      next();
    } else {
      store.commit('openNewPage', to);
      store.commit('setBreadCrumbsByRoute', to);
      next();
    }
  }else{
    next();
  }
  iView.LoadingBar.finish();
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

/**
 * 登录状态验证
 */
window.axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  if (error.response.status === 401) {
    router.push('/login');
  }
  return Promise.reject(error);
});


/**
 * 全局组件
 */
Vue.component('pagination', require('./components/Pagination.vue'));
Vue.component('vue-table', require('./components/Table.vue'));
Vue.component('app', require('./app.vue'));

const app = new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<app/>',
  mounted () {
    this.$store.dispatch('fetchUser');
    this.$store.dispatch('fetchUserPermissions');
  }
});
