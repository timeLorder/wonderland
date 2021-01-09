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
            :class="uploaderClass"
            :disabled="isUploading"
            :show-upload-list="false"
            :custom-request="upload"
          >
            <a-icon v-if="isUploading" class="upload-loading" type="loading" />
            <div v-else-if="formData.cover">
              <img class="upload-img" :src="formData.cover" alt="封面" />
              <div class="upload-right-top-corner" title="预览">
                <a-icon class="upload-preview" type="zoom-in" />
              </div>
              <div class="upload-right-bottom-corner" title="删除" @click="clearUpload">
                <a-icon class="upload-delete" type="delete" />
              </div>
            </div>
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
    cover: '',
    isPublic: true,
  };

  formRules = {
    title: [
      { required: true, message: '请输入标题', trigger: 'blur' },
      { max: 100, message: '请将标题字数控制在100以内', trigger: 'change' },
    ],
  };

  get uploaderClass() {
    return {
      'upload-result-container': !!this.formData.cover,
    };
  }

  handlePublish() {
    this.visible = true;
  }

  clearUpload(e: MouseEvent) {
    e.stopPropagation();
    this.formData.cover = '';
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

  .upload-result-container .ant-upload.ant-upload-btn {
    padding: 1px 0;
  }

  .upload-loading {
    font-size: 32px;
  }

  .upload-img {
    max-height: 146.8px;
  }

  .upload-right-top-corner,
  .upload-right-bottom-corner {
    position: absolute;
    right: -1px;
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .upload-right-top-corner {
    top: -1px;
    border-radius: 0 4px 0 30px;
  }

  .upload-right-bottom-corner {
    bottom: -1px;
    border-radius: 30px 0 4px 0;
  }

  .upload-preview {
    top: 4px;
  }

  .upload-delete {
    bottom: 4px;
  }

  .upload-preview,
  .upload-delete {
    position: absolute;
    right: 4px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.85);
    transition: all 0.3s;

    &:hover {
      color: #fff;
    }
  }
}
</style>
