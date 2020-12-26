import OSS from 'ali-oss';
import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator';
import { $axios } from '@/utils/axios-accessor';
import { getExtension } from '@/utils';

interface OssConfigType {
  bucket: string;
  endpoint: string;
  accessKeyId: string;
  accessKeySecret: string;
  stsToken: string;
}

@Module({
  name: 'oss',
  stateFactory: true,
  namespaced: true,
})
export default class OssModule extends VuexModule {
  config = {
    bucket: '',
    endpoint: '',
    accessKeyId: '',
    accessKeySecret: '',
    stsToken: '',
  };

  @VuexMutation
  setConfig({ bucket, endpoint, accessKeyId, accessKeySecret, stsToken }: OssConfigType) {
    this.config = {
      bucket,
      endpoint,
      accessKeyId,
      accessKeySecret,
      stsToken,
    };
  }

  @VuexAction
  async getConfig() {
    if (Object.values(this.config).some(v => !v)) {
      const config = await $axios.$get('/oss/config');
      this.setConfig(config);
      return config;
    } else {
      return this.config;
    }
  }

  @VuexAction
  async uploadOSS({ directory, file }: { directory: string; file: File }) {
    try {
      const config = await this.getConfig();

      const client = new OSS(config);
      const storeAs = `${directory}/${Date.now()}.${getExtension(file.name)}`;
      // @ts-ignore 忽略参数问题
      const res = await client.put(storeAs, file);
      return {
        name: res.name,
        url: res.url,
      };
    } catch (error) {
      // let it fails silently
    }
  }
}
