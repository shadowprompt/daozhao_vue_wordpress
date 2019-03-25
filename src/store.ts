import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { axios } from './config/index';

import categoriesQuery from './schema/category';
import listQuery from './schema/list';
import utils from './utils/index';
interface PostItem {
  post_date: string;
  date?: string;
}

interface ToggleType {
  [key: string]: boolean;
  isLoading: boolean;
  isCollapsed: boolean;
}

interface StateType {
  [key: string]: any;
}
//
// const toggleState: ToggleType = {
//
// };
interface ListType {
  categories: any[];
  list: any[];
}
type payloadIndex = 'isLoading' | 'isCollapsed';
type FromIndex = { [key in payloadIndex]?: boolean | undefined };

const theState = {
  categories: [],
  list: [],
  isLoading: false,
  isCollapsed: true,
};

export default new Vuex.Store({
  state: {
    categories: [],
    list: [],
    isLoading: false,
    isCollapsed: true, // 侧边菜单是否折叠
  },
  mutations: {
    SET_CATEGORIES(state, payload = []) {
      state.categories = payload;
    },
    SET_LIST(state, payload = []) {
      state.list = payload.map((item: any) => ({
        ...item,
        date: utils.timeStampFormat(item.post_date, 'yyyy-MM-dd'),
      }));
    },
    TOGGLE_LOADING(state, payload) {
      state.isLoading = payload;
    },
    TOGGLE_COLLAPSE(state, payload) {
      state.isCollapsed = payload === undefined ? !state.isCollapsed : payload;
    },
  },
  actions: {
    async _getCategories(context, params) {
      const res = await axios.post('/graphql', {
        query: categoriesQuery,
      });
      if (utils.httpSuccess(res)) {
        context.commit('SET_CATEGORIES', res.data.data.data);
      }
    },
    async _getList(context, params) {
      const res = await axios.post('/graphql', {
        query: listQuery,
      });
      if (utils.httpSuccess(res)) {
        context.commit('SET_LIST', res.data.data.data);
      }
    },
    toggleLoading(context, params) {
      context.commit('TOGGLE_LOADING', params);
    },
  },
  getters: {
    categories4Nav(state, getters) {
      return [
        {
          description: '首页',
          name: '首页',
          slug: '',
        },
      ].concat(state.categories);
    },
  },
});
