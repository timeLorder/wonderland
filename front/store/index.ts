import { Store } from 'vuex';
import { initialiseStores } from '~/utils/store-accessor';

const initializer = (store: Store<any>) => initialiseStores(store);

export const plugins = [initializer];
export * from '~/utils/store-accessor';

export const actions = {
  async nuxtServerInit({ dispatch }: any) {
    await dispatch('user/getStatus');
  },
};
