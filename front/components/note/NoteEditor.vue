<template>
  <tui-editor
    ref="wd-tui-editor"
    initial-edit-type="wysiwyg"
    :options="finalOptions"
    :height="height"
    :preview-style="previewStyle"
  />
</template>

<script lang="ts">
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/vue-editor';
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import { MarkdownEditorOptions } from '@/constants/editor';

type OptionsType = Partial<typeof MarkdownEditorOptions>;

@Component({
  components: {
    TuiEditor: () => import('@toast-ui/vue-editor').then(res => res.Editor),
  },
})
export default class App extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly options!: OptionsType;
  @Prop({ type: String, default: '300px' }) readonly height!: string;
  @Prop({ type: String, default: 'vertical' }) readonly previewStyle!: 'vertical' | 'tab';

  @Ref('wd-tui-editor') readonly editor!: Editor;

  get finalOptions() {
    return {
      ...MarkdownEditorOptions,
      ...this.options,
    };
  }

  getContent() {
    const html = this.editor.invoke('getHtml');
    const md = this.editor.invoke('getMarkdown');
    return {
      html,
      md,
    };
  }
}
</script>
