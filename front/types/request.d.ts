import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    /**
     * 是否禁用默认的错误提示自行处理, 默认值为 false
     */
    disableNotify?: boolean;
  }
}
