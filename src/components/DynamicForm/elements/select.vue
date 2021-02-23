<template>
  <el-select
    ref="select"
    v-model="val"
    v-bind="attrs"
    :loading="loading"
    v-on="events"
    @change="onChange"
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :value="item[valueKey]"
      :label="item[labelKey]"
      v-bind="item"
    />
  </el-select>
</template>

<script>
import { Select, Option } from 'element-ui';
import dfCommon from '../mixins/df-common';
import dfOptions from '../mixins/df-options';

export default {
  name: 'DfSelect',
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  mixins: [dfCommon, dfOptions],
  data() {
    return {
      val: this.value
    };
  },
  computed: {},
  created() {},
  methods: {
    /**
     * 值改变
     * - 如果有设置labelField自动填充
     * @param {*} value 值
     */
    onChange(value) {
      const { model } = this.dynamicForm;
      const { labelField } = this.config;
      const labelKey = this.labelKey;
      const valueKey = this.valueKey;
      if (labelField) {
        let res;
        // 多选下拉
        if (Array.isArray(value)) {
          res = [];
          value.forEach(val => {
            const v = this.options.find(item => item[valueKey] === val);
            v && res.push(v[labelKey]);
          });
          model[labelField] = res;
        } else {
          res = this.options.find(item => item[valueKey] === value);
          if (res) {
            model[labelField] = res[labelKey];
          } else {
            model[labelField] = '';
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
