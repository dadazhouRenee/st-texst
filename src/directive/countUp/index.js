/* countup.js的指令封装 */
import { CountUp } from "./countUp.js";

function assistCountUpFn(el, binding) {
  if (binding.value === undefined) {
    el.innerText = 0;
    return;
  }
  const val =
    typeof binding.value === "object" ? binding.value.number : binding.value;
  if (el.val === val) {
    return;
  }
  el.val = val;
  if (typeof binding.value === "object") {
    el.countUpComponent = new CountUp(el, binding.value.number || 0, {
      duration: 2,
      separator: binding.value.separator || ",",
      decimalPlaces: binding.value?.decimal || 0,
    });
  } else {
    el.countUpComponent = new CountUp(el, binding.value || 0, {
      duration: 2,
    });
  }
  el.countUpComponent.start();
}

// 数字动画
export default {
  inserted(el, binding) {
    assistCountUpFn(el, binding);
  },
  update(el, binding) {
    assistCountUpFn(el, binding);
  },
};
