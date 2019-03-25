import Vue from 'vue';

import { axios } from './config/index';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
import './assets/font-awesome/scss/font-awesome.scss';
import './assets/style.scss';

import { createApp } from './app';
// 客户端特定引导逻辑……

const { app, router, store } = createApp();

const vm = {
  app,
  router,
  store,
};
window.vm = vm;

router.onReady(() => {
  console.log('onReady -> ', app);
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    console.log('beforeResolve -> ', 858);
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });
    console.log('activated -> ', activated);
    if (!activated.length) {
      return next();
    }

    // 这里如果有加载指示器 (loading indicator)，就触发

    Promise.all(
      activated.map((c) => {
        if (c.asyncData) {
          console.log('hit -> ');
          return c.asyncData({ store, route: to });
        }
      }),
    )
      .then(() => {
        // 停止加载指示器(loading indicator)

        next();
      })
      .catch(next);
  });

  setTimeout(() => {
    console.log(' -> ', 988);
    app.$mount('#app');
  });
});

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
