<template>
    <div ref="scrollCon" @mousewheel="handlescroll" class="tags-outer-scroll-con">
        <div class="close-all-tag-con">
            <Dropdown @on-click="handleTagsOption">
                <Button size="small" type="primary">
                    标签选项
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="clearAll">关闭所有</DropdownItem>
                    <DropdownItem name="clearOthers">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
            <transition-group name="taglist-moving-animation">
                <Tag
                        type="dot"
                        v-for="(item, index) in pageTagsList"
                        ref="tagsPageOpened"
                        :key="item.name"
                        :name="item.name"
                        @on-close="closePage"
                        @click.native="linkTo(item)"
                        :closable="item.name==='home_index'?false:true"
                        :color="item.children?(item.children[0].name===currentPageName?'green':'default'):(item.name===currentPageName?'green':'default')"
                >{{ item.title }}</Tag>
            </transition-group>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'tagsPageOpened',
    data () {
      return {
        currentPageName: this.$route.name,
        tagBodyLeft: 0,
        currentScrollBodyWidth: 0,
        refsTag: [],
        tagsCount: 1
      };
    },
    props: {
      pageTagsList: Array
    },
    methods: {
      closePage (event, name) {
        this.$store.commit('removeTag', name);
        if (this.currentPageName === name) {
          let last = _.last(this.pageTagsList);
          this.$router.push({
            name: last.name
          });
        }
      },
      linkTo (item) {
        let routerObj = {};
        routerObj.name = item.name;
        if (item.params) {
          routerObj.params = item.params;
        }
        if (item.query) {
          routerObj.query = item.query;
        }
        this.$router.push(routerObj);
      },
      handlescroll (e) {
        let left = 0;
        if (e.wheelDelta > 0) {
          left = Math.min(0, this.tagBodyLeft + e.wheelDelta);
        } else {
          if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
            if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
              left = this.tagBodyLeft;
            } else {
              left = Math.max(this.tagBodyLeft + e.wheelDelta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
            }
          } else {
            this.tagBodyLeft = 0;
          }
        }
        this.tagBodyLeft = left;
      },
      handleTagsOption (type) {
        if (type === 'clearAll') {
          this.$store.commit('clearAllTags');
          this.$router.push({name: 'home_index'})
        } else {
          this.$store.commit('clearOtherTags', this.currentPageName);
        }
        this.tagBodyLeft = 0;
      },
      moveToView (tag) {
        if (tag.offsetLeft < -this.tagBodyLeft) {
          // 标签在可视区域左侧
          this.tagBodyLeft = -tag.offsetLeft + 10;
        } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
          // 标签在可视区域
        } else {
          // 标签在可视区域右侧
          this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
        }
      }
    },
    mounted () {
      this.refsTag = this.$refs.tagsPageOpened;
      setTimeout(() => {
        this.refsTag.forEach((item, index) => {
          if (this.$route.name === item.name) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      }, 1);  // 这里不设定时器就会有偏移bug
      this.tagsCount = this.pageTagsList.length;
    },
    watch: {
      '$route' (to) {
        this.currentPageName = to.name;
        this.$nextTick(() => {
          this.refsTag.forEach((item, index) => {
            if (to.name === item.name) {
              let tag = this.refsTag[index].$el;
              this.moveToView(tag);
            }
          });
        });
        this.tagsCount = this.pageTagsList.length;
      }
    }
  };
</script>