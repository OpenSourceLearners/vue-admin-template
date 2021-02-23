<template>
  <!-- 动态表单 -->
  <!-- @submit.native.prevent 阻止表单提交 -->
  <el-form
    ref="elForm"
    v-bind="formAttrs"
    :model="model"
    @submit.native.prevent
  >
    <slot name="before" />
    <!-- 动态渲染表单元素 -->
    <el-form-item
      v-for="(item, index) in formItems"
      :key="index"
      :label="item.label"
      :prop="item.field"
      :rules="item.rules"
    >
      <!-- 自定义组件 -->
      <slot
        v-if="item.type === 'slot'"
        :name="`slot|` + item.field"
        :data="model"
        :config="item"
      />
      <component
        :is="`df-${item.type}`"
        v-else
        :value="model[item.field]"
        :config="item"
        @input="val => onChangeValue(val, item)"
        @load-start="onLoadStart"
        @load-end="onLoadEnd"
      />
    </el-form-item>
    <slot name="after" />
  </el-form>
</template>

<script>
import { Form, FormItem } from 'element-ui';
import elements from './elements';

export default {
  name: 'DynamicForm',
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    ...elements
  },
  provide() {
    return {
      dynamicForm: this
    };
  },
  props: {
    /**
     * 表单模型数据
     */
    formModel: {
      type: Object,
      default: () => ({})
    },
    /**
     * 表单元素配置
     */
    formItems: {
      type: Array,
      default: () => []
    },
    /**
     * 表单属性
     */
    formAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 数据模型
      model: {},
      // 加载列表
      loadingList: [],
      // 解绑列表
      unwatchList: []
    };
  },
  computed: {
    /**
     * 表单正在加载中
     */
    loading() {
      return this.loadingList.length;
    }
  },
  watch: {
    // 监听表单数据模型
    formModel: {
      handler: 'changeFormModel',
      immediate: true
    },
    // 监听表单元素配置
    formItems: {
      handler: 'changeFormItems',
      immediate: true
    }
  },
  created() {
    this.$on('hook:destroyed', this.execUnwatch);
  },
  mounted() {
    this.extendElFormMethods();
  },
  methods: {
    /**
     * 表单数据模型改变
     */
    changeFormModel() {
      this.model = this.formModel;
    },
    /**
     * 表单元素配置改变
     */
    changeFormItems() {
      this.$nextTick(() => {
        // 解绑上次绑定的
        this.execUnwatch();
        // 监听插件类型的表单元素值
        this.formItems.forEach(item => {
          if (item.type !== 'slot') return;
          const unwatch = this.$watch(
            `model.${item.field}`,
            (newVal, oldVal) => {
              this.onChangeValue(newVal, item);
            }
          );
          this.unwatchList.push(unwatch);
        });
      });
    },
    /**
     * 执行解绑
     */
    execUnwatch() {
      this.unwatchList.map(item => item());
      this.unwatchList = [];
    },
    /**
     * 值改变
     * @param {*} value 值
     * @param {*} item 表单元素配置
     */
    onChangeValue(value, item) {
      // 更新数据
      // this.model[item.field] = value;
      this.$set(this.model, item.field, value);
      // 数据模型改变
      this.$emit('change-model', this.model, value, item.field);
    },
    /**
     * 组件开始加载数据
     * @param {Promise} promise 异步对象
     */
    onLoadStart(promise) {
      this.loadingList.push(promise);
    },
    /**
     * 组件开始加载数据
     * @param {Promise} promise 异步对象
     */
    onLoadEnd(promise) {
      const { loadingList } = this;
      const index = loadingList.indexOf(promise);
      index >= -1 && loadingList.splice(promise, 1);
    },
    /**
     * 设置模型值
     * @param {*} field 字段名
     * @param {*} value 值
     */
    setModelField(field, value) {
      const res = this.formItems.find(item => item.field === field);
      res && this.onChangeValue(value, res);
    },
    /**
     * 继承ElForm组件方法
     */
    extendElFormMethods() {
      const elForm = this.$refs.elForm;
      'validate,validateField,resetFields,clearValidate'
        .split(',')
        .forEach(key => {
          const methods = elForm[key];
          typeof methods === 'function' && (this[key] = methods);
        });
    }
  }
};
</script>
