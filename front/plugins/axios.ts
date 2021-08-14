import { Plugin } from '@nuxt/types';
import { notification } from 'ant-design-vue';
import { initializeAxios } from '@/utils/axios-accessor';

type ResponseType<T = any> = {
  success: boolean;
  data?: T;
  errorCode?: string;
  errorMessage?: string;
};

const defaultMsg = '系统繁忙，请稍后再试';

export class ResponseError extends Error {
  response?: ResponseType<any> & {
    errorMessage: string;
  };

  constructor(msg = defaultMsg, response?: ResponseType<any>) {
    super(msg);
    this.name = 'ResponseError';
    if (response) {
      this.response = {
        ...response,
        errorMessage: response.errorMessage || defaultMsg,
      };
    }
  }
}

const defaultResponseData: ResponseType = { success: false };

const axiosPlugin: Plugin = ({ $axios, redirect, store }) => {
  $axios.defaults.timeout = 5000;

  // let all status go to response .then
  $axios.defaults.validateStatus = () => true;

  $axios.onResponse<ResponseType<any>>(response => {
    const { status, data = defaultResponseData, config } = response;
    if (status < 200 || status >= 300) {
      throw new ResponseError(data.errorMessage, data);
    } else if (!data.success) {
      if (data.errorCode === 'WD0002') {
        // 未登录
        if (process.server) {
          redirect('/');
        } else {
          store.dispatch('common/openAuthModal');
        }
      } else if (!config.disableNotify && !process.server) {
        notification.error({
          message: '错误',
          description: data.errorMessage || defaultMsg,
        });
      }
      throw new ResponseError(data.errorMessage, data);
    }

    return response;
  });

  initializeAxios($axios);
};

export default axiosPlugin;
