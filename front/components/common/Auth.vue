<template>
  <a-modal
    v-model="visible"
    dialog-class="wd-auth-modal"
    title="账密登录 / 注册"
    :footer="null"
    :mask-closable="false"
  >
    <a-form-model
      ref="wd-auth-form"
      layout="vertical"
      :model="formData"
      :rules="formRules"
      hide-required-mark
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item prop="username">
        <a-input v-model="formData.username" size="large" placeholder="用户名">
          <a-icon slot="addonBefore" type="user" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password" :help="passwordHelp" :validate-status="passwordStatus">
        <a-input-password v-model="formData.password" size="large" placeholder="密码">
          <a-icon slot="addonBefore" type="lock" />
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          class="active-button"
          type="primary"
          size="large"
          html-type="submit"
          block
          :loading="loading"
        >
          登录 / 注册
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-divider>第三方登录</a-divider>
    <a-row>
      <a-col class="wd-auth-third-col" :span="8" :offset="4">
        <a-button class="active-button" shape="circle" size="large" title="通过github登录">
          <a-icon type="github" />
        </a-button>
      </a-col>
      <a-col class="wd-auth-third-col" :span="8">
        <a-button class="active-button" shape="circle" size="large" title="通过微信登录">
          <a-icon type="wechat" />
        </a-button>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';
import { FormModel, ValidationRule } from 'ant-design-vue/types/form-model/form';
import { commonStore } from '@/store';

@Component
export default class Auth extends Vue {
  @Ref('wd-auth-form') readonly authForm!: FormModel;

  passwordHelp = '';
  passwordStatus = '';
  loading = false;

  formData = {
    username: '',
    password: '',
  };

  clearHelp() {
    this.passwordHelp = '';
  }

  updateStatus(newStatus: string) {
    this.passwordStatus = newStatus;
  }

  pwdValidator: ValidationRule['validator'] = (_, value, callback) => {
    this.clearHelp();
    if (!value) {
      this.updateStatus('error');
      callback(new Error('请输入密码'));
    } else if (value.length < 6) {
      this.updateStatus('error');
      callback(new Error('密码长度不能少于6位'));
    } else {
      this.updateStatus('');
      callback();
    }
  };

  formRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ validator: this.pwdValidator, trigger: 'blur' }],
  };

  get visible() {
    return commonStore.authModalVisible;
  }

  set visible(v) {
    commonStore.setAuthModal(v);
  }

  async handleSubmit() {
    // if validation error exists, dont continue
    if (this.passwordHelp) {
      return false;
    }

    try {
      await this.authForm.validate();
    } catch (error) {
      return false;
    }

    this.loading = true;
    try {
      await this.$axios.post('/common/onboard', this.formData, { disableNotify: true });
      this.loading = false;
      window.location.reload();
    } catch (error) {
      if (error.response.errorCode === 'WD0011' || error.response.errorCode === 'WD0012') {
        this.passwordHelp = error.response.errorMessage;
        this.passwordStatus = 'error';
      } else {
        this.$notification.error({
          message: '错误',
          description: error.response.errorMessage,
        });
      }
      this.loading = false;
    }
  }
}
</script>

<style lang="less">
.wd-auth-modal {
  top: 20%;
  width: 400px !important;

  .wd-auth-third-col {
    text-align: center;

    i {
      vertical-align: middle;
      font-size: 20px;
    }
  }
}
</style>
