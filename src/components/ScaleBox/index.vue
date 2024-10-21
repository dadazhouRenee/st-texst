<!--
 * @Author: 周冰洁
-->
<template>
  <div class="scale-box-wrap" :ref="ref" :style="{ width: targetWidth + 'px', height: targetHeight + 'px' }">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import autoResize from "@/mixins/autoResize.js";

export default {
  name: "ScaleBox",
  mixins: [autoResize],
  props: {
    targetWidth: {
      type: Number,
      default: 1920,
    },
    targetHeight: {
      type: Number,
      default: 1080,
    },
    isRadioX: {
      // 是否x比例缩放
      type: Boolean,
    },
  },
  data() {
    return {
      ref: "scaleBox",
      datavRoot: "",
      ready: false,
    };
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { initConfig, setAppScale } = this;

      // initConfig();

      setAppScale();

      this.ready = true;
    },
    // initConfig() {
    //   const { dom } = this;
    //   const { width, height } = screen;

    //   dom.style.width = `${width}px`;
    //   dom.style.height = `${height}px`;
    // },
    setAppScale() {
      const { targetWidth, targetHeight, isRadioX, dom } = this;

      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;

      // 固定好16：9的宽高比，计算出最合适的缩放比
      const ww = currentWidth / targetWidth;
      const wh = currentHeight / targetHeight;
      const _scale = ww < wh ? ww : wh;
      const scale = isRadioX ? ww : _scale;
      // console.log('ww', ww, 'wh', wh, 'scale', scale)
      dom.style.transform = `scale(${scale})`

      // dom && dom.style.setProperty("--scale", scale);
    },
    onResize() {
      this.setAppScale();
    },
  },
};
</script>

<style lang="scss" scoped>
.scale-box-wrap {
  position: absolute;
  transform: scale(var(--scale));
  display: flex;
  flex-direction: column;
  transform-origin: 0 0;
  left: 0;
  top: 0;
}
</style>
