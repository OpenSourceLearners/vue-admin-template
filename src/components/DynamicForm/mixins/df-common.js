import bindValue from './bind-value';

export default {
  // 注入的表单
  inject: ['dynamicForm'],
  mixins: [bindValue],
  props: {
    /**
     * 配置
     */
    config: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    /**
     * attrs配置
     */
    attrs() {
      return this.config.attrs || {};
    },
    /**
     * 事件配置
     * 注入model参数
     */
    events() {
      const events = { ...this.config.events } || {};
      const self = this;
      Object.keys(events).forEach(key => {
        const event = events[key];
        events[key] = function(...args) {
          args.unshift(self.dynamicForm.model);
          return event.apply(this, args);
        }
      });
      return events;
    }
  },
  created() {
    // 检测是否动态表单包裹
    if (!this.dynamicForm) throw new Error('缺少dynamicForm组件包裹');
  }
};
