<template>
    <Menu ref="sideMenu" :active-name="currentPageName" :open-names="openedSubmenuArr" theme="dark" width="auto"
          @on-select="changeMenu">
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="item.path">
                <Icon :type="item.meta.icon" :size="iconSize" :key="item.path"></Icon>
                <span class="layout-text" :key="item.path">{{ item.meta.title }}</span>
            </MenuItem>

            <Submenu v-if="item.children.length>1" :name="item.name" :key="item.path">
                <template slot="title">
                    <Icon :type="item.meta.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ item.meta.title }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="child.name">
                        <Icon :type="child.meta.icon" :size="iconSize" :key="child.name"></Icon>
                        <span class="layout-text" :key="child.name">{{ child.meta.title }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
  export default {
    data () {
      return {
        currentPageName: this.$route.name,
        openedSubmenuArr: [this.$route.matched[0].name]
      };
    },
    name: 'sidebarMenu',
    props: {
      slotTopClass: String,
      menuList: Array,
      iconSize: Number
    },
    methods: {
      changeMenu (active) {
        this.$router.push({
          name: active
        });
      }
    },
    watch: {
      '$route' (to) {
        this.currentPageName = to.name;
      },
      currentPageName () {
        this.$nextTick(() => {
          this.$refs.sideMenu.updateOpened();
        });
      }
    },
    updated () {
      this.$nextTick(() => {
        this.$refs.sideMenu.updateOpened();
      });
    }
  };
</script>