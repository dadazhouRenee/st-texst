<template>
  <dv-border-box-8>
    <div class="col-container-wrap">
      <div class="col-container-title">
        {{  title }}
      </div>
      <div class="col-container-content">
        <slot />
      </div>
    </div>
  </dv-border-box-8>

</template>

<script>
import Border from './Border';
export default {
  name: 'ColConatiner',
  components: {
    'dv-border-box-8': Border
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.col-container-wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  $titleHeight: 30px;
  // background-image: url('../imgs/border.png');
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  padding: 10px;
  .col-container-title {
    font-size: 18px;
    padding: 0 10px;
    line-height: $titleHeight;
    height: $titleHeight;
    color: var(--primary-color);
    // background-color: var(--title-bg-color);
    // border: var(--title-border-size)  solid  var(--title-border-color);
  }
  .col-container-content {
    width: 100%;
    padding: 5px;
    height: calc(100% - #{$titleHeight});
    // background-color: var(--content-bg-color);
    // border: 1px solid var(--content-border-color);
    // border-top: none;
    overflow: hidden;
  }
}

</style>
