/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'nuxt-property-decorator';
import common from '~/store/common';
import user from '~/store/user';

let commonStore: common;
let userStore: user;

function initialiseStores(store: Store<any>): void {
  commonStore = getModule(common, store);
  userStore = getModule(user, store);
}

export { initialiseStores, commonStore, userStore };
