export default {
  props: {
    /**
     * 外部值
     */
    value: {}
  },
  data() {
    return {
      // 内部值
      val: this.value
    };
  },
  watch: {
    /**
     * 向上传值
     */
    val() {
      this.$emit('input', this.val);
    },
    /**
     * 向下传值
     */
    value() {
      this.val = this.value;
    }
  }
};
