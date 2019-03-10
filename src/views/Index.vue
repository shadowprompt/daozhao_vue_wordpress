<template>
  <div class="index">
    <list></list>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import List from '../components/List.vue';
import axios from 'axios';
export default {
  components: {
    List,
  },
};
</script>
