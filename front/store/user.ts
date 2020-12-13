import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator';
import { $axios } from '@/utils/axios-accessor';
import { defaultAvatar } from '@/constants';

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
export default class UserModule extends VuexModule {
  isLogin = false;
  userid = '';
  username = '';
  avatar = '';

  @VuexMutation
  setIsLogin(v: boolean) {
    this.isLogin = v;
  }

  @VuexMutation
  setUserid(id: string) {
    this.userid = id;
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
      const res = await $axios.$get('/user/status', { disableNotify: true });
      if (res) {
        this.setIsLogin(res.isLogin);
        this.setUserid(res.userid);
        this.setUsername(res.username);
        this.setAvatar(res.avatar || defaultAvatar);
      }
    } catch (error) {
      // let it fails silently
    }
  }

  @VuexAction
  async logout() {
    try {
      await $axios.$post('/user/logout');
      this.setIsLogin(false);
      this.setUserid('');
      this.setUsername('');
      this.setAvatar('');
      window.location.reload();
    } catch (error) {
      // let it fails silently
    }
  }
}
