<template>
    <Breadcrumb>
        <Breadcrumb-item href="/home/index" v-if="breadCrumbs.length > 0">首页</Breadcrumb-item>
        <template v-for="item in breadCrumbs">
            <Breadcrumb-item v-if="item.active == true">{{item.name}}</Breadcrumb-item>
            <Breadcrumb-item v-else :href="item.href">{{item.name}}</Breadcrumb-item>
        </template>
    </Breadcrumb>
</template>

<script>
  export default {
    name: 'breadcrumbNav',
    props: {
      breadCrumbs: Array
    }
  };
</script>