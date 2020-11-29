<template>
  <div>
    <a-button class="active-button" type="primary" @click="handlePublish">发布</a-button>
    <a-modal
      v-model="visible"
      wrap-class-name="wd-edit-confirm-modal"
      title="请确认以下信息"
      :mask-closable="false"
    >
      <a-form-model
        ref="wd-edit-confirm-form"
        layout="vertical"
        :model="formData"
        :rules="formRules"
        hide-required-mark
      >
        <a-form-model-item prop="title" label="标题">
          <a-textarea
            v-model="formData.title"
            placeholder="请在此输入标题"
            :auto-size="{ maxRows: 2 }"
          />
        </a-form-model-item>
        <a-form-model-item prop="cover" label="封面">
          <a-upload-dragger name="file" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or
              other band files
            </p>
          </a-upload-dragger>
        </a-form-model-item>
      </a-form-model>
      <template #footer>
        <a-button type="primary" size="large" block :loading="isSubmiting" @click="handleConfirm">
          确认发布
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import { FormModel } from 'ant-design-vue/types/form-model/form';

@Component
export default class App extends Vue {
  @Prop({ type: Boolean, default: false }) readonly isSubmiting!: boolean;

  @Ref('wd-edit-confirm-form') readonly form!: FormModel;

  private visible = false;

  formData = {
    title: '',
    cover: '', // todo 接入oss上传
  };

  formRules = {
    title: [
      { required: true, message: '请输入标题', trigger: 'blur' },
      { max: 100, message: '请将标题字数控制在100以内', trigger: 'change' },
    ],
  };

  handlePublish() {
    this.visible = true;
  }

  async handleConfirm() {
    try {
      await this.form.validate();
    } catch (error) {
      return false;
    }
    this.$emit('submit', this.formData);
  }
}
</script>

<style lang="less">
.wd-edit-confirm-modal {
  .ant-modal {
    top: 20%;

    .ant-modal-footer {
      padding: 0;
      text-align: center;
      border-top: none;

      button {
        border-radius: 0 0 3px 3px;
        height: 56px;
      }
    }
  }
}
</style>
