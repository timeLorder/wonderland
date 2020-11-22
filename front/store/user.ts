import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator';
import { $axios } from '@/utils/axios-accessor';

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
export default class UserModule extends VuexModule {
  isLogin = false;
  username = '';
  avatar = '';

  @VuexMutation
  setIsLogin(v: boolean) {
    this.isLogin = v;
  }

  @VuexMutation
  setUsername(name: string) {
    this.username = name;
  }

  @VuexMutation
  setAvatar(avatar: string) {
    this.avatar = avatar;
  }

  @VuexAction
  async getStatus() {
    try {
      const res = await $axios.$get('/common/status', { disableNotify: true });
      if (res) {
        this.setIsLogin(res.isLogin);
        this.setUsername(res.username);
        this.setAvatar(res.avatar);
      }
    } catch (error) {
      // let it fails silently
    }
  }

  @VuexAction
  async logout() {
    try {
      await $axios.$put('/private/logout');
      this.setIsLogin(false);
      this.setUsername('');
      this.setAvatar('');
      window.location.reload();
    } catch (error) {
      // let it fails silently
    }
  }
}
