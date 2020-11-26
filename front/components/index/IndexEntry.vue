<template>
  <div class="wd-entry" :class="entryClassnames" @click="jumpInto">
    <img class="wd-entry-img" :src="entryBg" :alt="type" />
    <div class="wd-entry-mask">{{ title }}</div>
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
    this.$router.push(`/${this.type}`);
  }
}
</script>

<style lang="less">
.wd-entry {
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 380px;
  border-radius: 16px;
  box-shadow: 0 3px 4px 0 rgba(44, 71, 146, 0.32), inset 0 -2px 0 0 #e1e3e8;
  color: white;
  cursor: pointer;

  &:first-child,
  &:nth-child(2) {
    margin-bottom: 40px;
  }

  .wd-entry-img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 16px;
    transition: all 0.4s ease-out;
  }

  .wd-entry-mask {
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    opacity: 0;
    border-radius: 16px;
    width: 500px;
    height: 380px;
    line-height: 380px;
    text-align: center;
    font-size: 30px;
    letter-spacing: 8px;
    transition: all 0.4s ease-out;
  }

  &:hover {
    .wd-entry-img {
      transform: scale(1.1, 1.1);
    }
    .wd-entry-mask {
      opacity: 0.5;
    }
  }
}
</style>
