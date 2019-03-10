<template>
  <div class="post-list">
    <postBrief v-for="(item, index) in list" :key="'list-' + index" :data="item"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import postBrief from './PostBrief.vue';

export default {
  components: {
    postBrief,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['list']),
  },
  methods: {
    ...mapActions(['_getList']),
  },
  async created() {
    this._getList();
  },
};
</script>
