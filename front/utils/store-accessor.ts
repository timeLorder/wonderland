/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'nuxt-property-decorator';
import common from '~/store/common';
import user from '~/store/user';
import oss from '~/store/oss';

let commonStore: common;
let userStore: user;
let ossStore: oss;

function initialiseStores(store: Store<any>): void {
  commonStore = getModule(common, store);
  userStore = getModule(user, store);
  ossStore = getModule(oss, store);
}

export { initialiseStores, commonStore, userStore, ossStore };
