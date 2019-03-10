<template>
  <div id="app">
    <div id="loading" :class="$store.state.isLoading? 'active' : ''"></div>
    <header class="top-header" id="header">
      <div class="flex-row">
        <span class="header-icon waves-line on" id="menu-toggle">
          <span class="line line-top"></span>
          <span class="line line-middle"></span>
          <span class="line line-bottom"></span>
        </span>
        <div class="flex-col header-title ellipsis"> {{config.static.websiteName}}		</div>

        <div class="search-wrap" id="search-wrap">

        </div>
      </div>
    </header>
    <header id="nav">
      <category-nav></category-nav>
    </header>
    <section class="container body-wrapper">
      <router-view/>
    </section>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import CategoryNav from './components/CategoryNav';
import { config } from './config';

export default {
  components: {
    CategoryNav,
  },
  data() {
    return {
      config,
    };
  },
  provide() {
    return config;
  },
  computed: {
    ...mapState(['categories']),
  },
  async created() {
    this._getCategories();
  },
  mounted() {
    // 将this传入并设置axios拦截器
    this.$http.setConfig(this);
  },
  methods: {
    ...mapMutations(['TOGGLE_LOADING']),
    ...mapActions(['_getCategories']),
  },
  watch: {
    $route(to, from) {
      // 页面跳转就开启loading效果
      this.TOGGLE_LOADING(true);
    },
  },
};
</script>
