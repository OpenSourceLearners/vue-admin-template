import isEmpty from 'lodash/isEmpty';

export default {
  // 注入的表单
  inject: ['dynamicForm'],
  data() {
    return {
      remoteOptions: [], // 远程获取的选项
      lastRequest: null // 最后一次请求标识
    };
  },
  computed: {
    /**
     * 标签key
     */
    labelKey() {
      return this.config.labelKey || 'label';
    },
    /**
     * 值key
     */
    valueKey() {
      return this.config.valueKey || 'value';
    },
    /**
     * 是否是远程获取选项
     */
    isRemoteOptions() {
      const { options } = this.config;
      return options && typeof options === 'function';
    },
    /**
     * 选项数据
     */
    options() {
      const options = this.isRemoteOptions
        ? this.remoteOptions
        : this.config.options;
      return Array.isArray(options) ? options : [];
    },
    /**
     * 是否在加载数据中
     */
    loading() {
      return !!this.lastRequest;
    }
  },
  created() {
    const {
      parentField
    } = this.config;
    (!parentField || !isEmpty(this.dynamicForm.model[parentField])) && this.fetchRemoteOptions();
  },
  methods: {
    /**
     * 绑定级联关系
     */
    bindCascade() {
      const { parentField } = this.config;
      // 监听上级元素变化
      const unwatch = this.dynamicForm.$watch(
        `model.${parentField}`,
        this.changeParentValue
      );
      // 组件销毁解绑监听
      this.$on('hook:destroyed', () => {
        unwatch();
      });
    },
    /**
     * 上级元素值改变
     */
    changeParentValue(newVal, oldVal) {
      this.val = Array.isArray(this.val) ? [] : '';
      // 获取数据
      this.fetchRemoteOptions();
    },
    /**
     * 获取远程数据
     */
    fetchRemoteOptions() {
      // 判断是否获取远程数据
      if (!this.isRemoteOptions) return;
      const {
        options: ajax, // 获取数据方法
        field, // 字段名
        parentField // 上级元素字段名
      } = this.config;
      const model = this.dynamicForm.model; // 表单数据
      // 有上级元素，并且父元素值为空不请求数据设置为空数组
      if (parentField && isEmpty(model[parentField])) {
        this.remoteOptions = [];
        return;
      }
      let res = ajax(model, this.val, field);
      // 判断是否是异步方法
      if (!(res instanceof Promise)) {
        res = Array.isArray(res) ? res : [];
        this.remoteOptions = res;
        return;
      }
      this.$emit('load-start', res);
      // 保存请求
      this.lastRequest = res;
      res
        .then(data => {
          // 检测是否是最后一次请求
          if (res !== this.lastRequest) return;
          this.remoteOptions = Array.isArray(data) ? data : [];
          this.lastRequest = null;
        })
        .catch(() => {
          // 请求失败设置为空数据
          this.remoteOptions = [];
        })
        .finally(() => {
          // this.$emit('load-end', res);
          // 检测是否是最后一次请求
          if (res !== this.lastRequest) return;
          this.lastRequest = null;
        });
    }
  }
};
