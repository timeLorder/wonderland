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
          <a-upload-dragger
            :disabled="isUploading"
            :show-upload-list="false"
            :custom-request="upload"
          >
            <a-icon v-if="isUploading" type="loading" />
            <img
              v-else-if="formData.cover"
              class="ant-upload-img"
              :src="formData.cover"
              alt="封面"
            />
            <template v-else>
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">点击或拖动文件至此以进行上传</p>
              <p class="ant-upload-hint">图片类型可以为 JPG 或 PNG，文件大小应不大于10MB。</p>
            </template>
          </a-upload-dragger>
        </a-form-model-item>
        <a-form-model-item prop="isPublic" label="公开">
          <a-switch v-model="formData.isPublic" checked-children="是" un-checked-children="否" />
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
import { ossStore } from '@/store';

@Component
export default class App extends Vue {
  @Prop({ type: Boolean, default: false }) readonly isSubmiting!: boolean;

  @Ref('wd-edit-confirm-form') readonly form!: FormModel;

  private visible = false;
  private isUploading = false;

  formData = {
    title: '',
    cover: '', // todo 接入oss上传
    isPublic: true,
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

  async upload({ file }: { file: File }) {
    this.isUploading = true;

    const res = await ossStore.uploadOSS({ directory: 'cover', file });
    this.formData.cover = res?.url || '';
    this.isUploading = false;
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

  .ant-upload-drag-container {
    height: 120px;

    .ant-upload-img {
      max-height: 120px;
    }
  }
}
</style>
