/**
 * Created by 都大爽 on 2017/8/7.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import selectData from '../libs/getDataForSelect';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {

    /**
     * 显示的标签列表
     */
    pageOpenedList: [
      {
        path: '/home/index',
        name: 'home_index',
        title: '首页'
      }
    ],

    /**
     * 页面标题
     */
    title: '',

    /**
     * 登录后跳转地址
     */
    authRedirectUrl: '/',

    /**
     * 用户信息
     */
    user: {
      name: '',
      email: '',
      mobile: '',
      avatar: '',
      permissions: [], //权限列表
      can: function (permission) {
        return _.indexOf(this.permissions, permission) > -1;
      }
    },

    /**
     * 面包屑
     */
    breadCrumbs: [],

    /**
     * 省份列表
     */
    provinceList: [],

    /**
     * 职称列表
     */
    positionTitleList: [],

    /**
     * 赛事列表
     */
    awardList: [],

    /**
     * 命题列表
     */
    propositionList: [],

    /**
     * 作品类别列表
     */
    worksTypeList: [],

    /**
     * 奖项列表
     */
    voteAwardList: []
  },
  getters: {
    awardList: state => {
      return state.awardList;
    }
  },

  mutations: {

    /**
     * 添加一个新的标签页
     * @param state
     * @param route
     */
    openNewPage (state, route) {
      if (_.findIndex(state.pageOpenedList, ['name', route.name]) === -1) {
        state.pageOpenedList.push({
          path: route.path,
          name: route.name,
          title: route.meta.title,
          params: route.params,
          query: route.query
        });
      }
    },

    /**
     * 移除一个标签页
     * @param state
     * @param name
     */
    removeTag (state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1);
        }
      });
    },

    /**
     * 清空所有标签页
     * @param state
     */
    clearAllTags (state) {
      state.pageOpenedList.splice(1);
    },

    /**
     * 清空其他标签页
     * @param state
     * @param name
     */
    clearOtherTags (state, name) {
      if (name === 'home_index'){
        state.pageOpenedList.splice(1);
      }else{
        let currentTag = _.find(state.pageOpenedList, ['name', name]);
        state.pageOpenedList = [
          {
            path: '/home/index',
            name: 'home_index',
            title: '首页'
          },
          currentTag
        ]
      }
    },

    /**
     * 变更标题
     * @param state
     * @param title
     */
    setTitle (state, title) {
      state.title = title;
      document.title = '学院奖后台-' + state.title;
    },

    /**
     * 设置登录后重定向地址
     * @param state
     * @param authRedirectUrl
     */
    setAuthRedirectUrl (state, authRedirectUrl) {
      state.authRedirectUrl = authRedirectUrl;
    },

    /**
     * 设置当前用户
     * @param state
     * @param user
     */
    setUser(state, user){
      debug && console.log(user);
      state.user.name = user.name;
      state.user.email = user.email;
      state.user.mobile = user.profile_info.mobile;
    },

    /**
     * 设置当前用户权限
     * @param state
     * @param permissions
     */
    setUserPermissions(state, permissions){
      debug && console.log(permissions);
      state.user.permissions = permissions;
    },

    /**
     * 设置面包屑
     * @param state
     * @param breadCrumbs
     */
    setBreadCrumbs(state, breadCrumbs){
      debug && console.log(breadCrumbs);
      state.breadCrumbs = breadCrumbs;
    },

    /**
     * 根据路由设置面包屑
     * @param state
     * @param route
     */
    setBreadCrumbsByRoute (state, route) {
      if (route.meta.breadCrumbs){
        state.breadCrumbs = route.meta.breadCrumbs;
      }
    },

    /**
     * 储存省份下拉列表
     * @param state
     * @param provinceList
     */
    setProvinceList(state, provinceList){
      debug && console.log(provinceList);
      state.provinceList = provinceList;
    },

    /**
     * 储存职称下拉列表
     * @param state
     * @param positionTitleList
     */
    setPositionalTitleList(state, positionTitleList){
      debug && console.log(positionTitleList);
      state.positionTitleList = positionTitleList;
    },

    /**
     * 储存赛事下拉列表
     * @param state
     * @param awardList
     */
    setAwardList(state, awardList){
      state.awardList = awardList;
    },

    /**
     * 储存命题下拉列表
     * @param state
     * @param propositionList
     */
    setPropositionList(state, propositionList){
      state.propositionList = propositionList;
    },

    /**
     * 储存作品类别下拉列表
     * @param state
     * @param worksTypeList
     */
    setWorksTypeList(state, worksTypeList){
      state.worksTypeList = worksTypeList;
    },

    /**
     * 储存奖项下拉列表
     * @param state
     * @param voteAwardList
     */
    setVoteAwardList(state, voteAwardList){
      state.voteAwardList = voteAwardList;
    }
  },

  actions: {

    /**
     * 获取当前用户
     * @param commit
     */
    fetchUser({commit}){
      axios.get('api/admin/profile').then(function (response) {
        debug && console.log('Susscee:', response);
        commit('setUser', response.data);
      }).catch(function (error) {
        // Something happened in setting up the request that triggered an Error
        debug && console.log('Error', error.message);
      });
    },

    /**
     * 获取用户权限
     * @param commit
     */
    fetchUserPermissions({commit}){
      axios.get('api/admin/permission').then(function (response) {
        debug && console.log('Susscee:', response);
        commit('setUserPermissions', response.data);
      }).catch(function (error) {
        // Something happened in setting up the request that triggered an Error
        debug && console.log('Error', error.message);
      });
    },

    /**
     * 获取省份列表
     * @param commit
     * @param state
     */
    fetchProvinceList({commit, state}){
      if (state.provinceList.length < 1) {
        selectData.getProvinceList({}, function (data) {
          commit('setProvinceList', data);
        });
      }
    },

    /**
     * 获取职称列表
     * @param commit
     * @param state
     */
    fetchPositionalTitleList({commit, state}){
      if (state.positionTitleList.length < 1) {
        selectData.getPositionTitleList({}, function (data) {
          commit('setPositionalTitleList', data);
        });
      }
    },

    /**
     * 获取赛事列表
     * @param commit
     * @param state
     */
    fetchAwardList({commit, state}){
      if (state.awardList.length < 1) {
        selectData.getAwardList({}, function (data) {
          commit('setAwardList', data);
        });
      }
    },

    /**
     * 获取命题列表
     * @param commit
     * @param state
     */
    fetchPropositionList({commit, state}){
      if (state.propositionList.length < 1) {
        selectData.getPropositionList({}, function (data) {
          commit('setPropositionList', data);
        });
      }
    },

    /**
     * 获取作品类别列表
     * @param commit
     * @param state
     */
    fetchWorksTypeList({commit, state}){
      if (state.worksTypeList.length < 1) {
        selectData.getWorksTypeList({}, function (data) {
          commit('setWorksTypeList', data);
        });
      }
    },

    /**
     * 获取奖项列表
     * @param commit
     * @param state
     */
    fetchVoteAwardList({commit, state}){
      if (state.voteAwardList.length < 1) {
        selectData.getVoteAwardList({}, function (data) {
          commit('setVoteAwardList', data);
        });
      }
    }
  },
  modules: {
    // member
  },

  strict: debug,
  // plugins: debug ? [createLogger()] : []
})
