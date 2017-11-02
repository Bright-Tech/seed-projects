<template>
    <div class="main" :class="{'main-hide-text': hideMenuText}">
        <div class="sidebar-menu-con"
             :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto', background: '#495060'}">
            <div class="logo-con">
                <img v-show="!hideMenuText" src="../../images/logo.png" key="max-logo"/>
                <img v-show="hideMenuText" src="../../images/logo-min.png" key="min-logo"/>
            </div>
            <sidebar-menu v-if="!hideMenuText" :menuList="menuList" :iconSize="14"/>
            <sidebar-menu-shrink icon-color="white" v-else :menuList="menuList"/>
        </div>
        <div class="main-header-con" :style="{paddingLeft: hideMenuText?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" type="text"
                            @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :breadCrumbs="breadCrumbs"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ user.name }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="logout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar src="../../images/portrait.png" style="background: #48c2a9;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageOpenedList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: hideMenuText?'60px':'200px'}">
            <div class="single-page">
                <keep-alive :exclude="noCachePages">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
  import { appRouter } from '../router/router';
  import sidebarMenu from './sidebarMenu.vue';
  import breadcrumbNav from './breadcrumbNav.vue';
  import sidebarMenuShrink from './sidebarMenuShrink.vue';
  import tagsPageOpened from './tagsPageOpened.vue';
  import { mapState } from 'vuex';

  export default {
    components: {
      sidebarMenu,
      breadcrumbNav,
      sidebarMenuShrink,
      tagsPageOpened
    },
    data () {
      return {
        spanLeft: 4,
        spanRight: 20,
        currentPageName: '',
        hideMenuText: false,
        noCachePages: ['award-company', 'report', 'works-detail']
      };
    },
    computed: {
      ...mapState({
        user: 'user',
        breadCrumbs: 'breadCrumbs',
        pageOpenedList: 'pageOpenedList'
      }),
      menuList () {
        return appRouter;
      }
    },
    methods: {
      toggleClick () {
        this.hideMenuText = !this.hideMenuText;
      },
      handleClickUserDropdown (name) {
        if (name === 'ownSpace') {
          //
        } else if (name === 'logout') {
          axios.post('logout', {})
            .then(function (response) {
              window.location.reload();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
  };
</script>