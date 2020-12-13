<template>
  <div class="entry-card" :class="entryClassnames" @click="jumpInto">
    <img class="entry-img" :src="entryBg" :alt="type" />
    <div class="entry-mask">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import exploreBg from '@/assets/images/explore-entry-bg.jpg';
import noteBg from '@/assets/images/note-entry-bg.jpg';
import focusBg from '@/assets/images/focus-entry-bg.jpg';
import relaxBg from '@/assets/images/relax-entry-bg.png';

enum EntryType {
  EXPLORE = 'explore',
  NOTE = 'note',
  FOCUS = 'focus',
  RELAX = 'relax',
}

@Component
export default class App extends Vue {
  @Prop({ type: String, required: true }) readonly type!: EntryType;
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: String, default: '' }) readonly path!: string;

  private entryBg;

  constructor() {
    super();
    if (this.type === EntryType.EXPLORE) this.entryBg = exploreBg;
    if (this.type === EntryType.NOTE) this.entryBg = noteBg;
    if (this.type === EntryType.FOCUS) this.entryBg = focusBg;
    if (this.type === EntryType.RELAX) this.entryBg = relaxBg;
  }

  get entryClassnames() {
    return {
      [`wd-${this.type}-entry`]: true,
    };
  }

  jumpInto() {
    const to = this.path || `/${this.type}`;
    this.$router.push(to);
  }
}
</script>

<style lang="less" scoped>
.entry-card {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 120px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.1);
  color: white;
  cursor: pointer;

  .entry-img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 12px;
    transition: all 0.4s ease-out;
  }

  .entry-mask {
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    opacity: 0;
    border-radius: 12px;
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 20px;
    letter-spacing: 8px;
    transition: all 0.4s ease-out;
  }

  &:hover {
    .entry-img {
      transform: scale(1.1, 1.1);
    }
    .entry-mask {
      opacity: 0.5;
    }
  }
}
</style>
