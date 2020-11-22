import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator';

@Module({
  name: 'common',
  stateFactory: true,
  namespaced: true,
})
export default class CommonModule extends VuexModule {
  authModalVisible: boolean = false;

  @VuexMutation
  setAuthModal(value: boolean) {
    this.authModalVisible = value;
  }

  @VuexAction({ commit: 'setAuthModal' })
  openAuthModal() {
    return true;
  }

  @VuexAction({ commit: 'setAuthModal' })
  closeAuthModal() {
    return false;
  }
}
