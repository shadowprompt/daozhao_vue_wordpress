import axios from 'axios';
const axiosConfig = {
  timeout: 30000,
  baseURL: 'https://www.daozhao.com.cn',
};
const instance: any = axios.create(axiosConfig);

instance.setConfig = (vm: any) => {
  instance.interceptors.response.use(
    function(response: Response) {
      // Do something with response data
      console.log('请求成功');
      setTimeout(() => {
        vm.$store.dispatch('toggleLoading', false);
      }, 0);
      return response;
    },
    function() {
      // Do something with response error
    },
  );
};

export { instance as axios };

const config = {
  URL: 'https://www.daozhao.com.cn',
};
export { config };
