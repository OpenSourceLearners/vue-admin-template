<template>
  <el-checkbox-group v-model="val" v-bind="attrs">
    <template v-for="(item, index) in options">
      <el-checkbox-button
        v-if="config.radioButton"
        :key="index"
        v-bind="item"
        :label="item[valueKey]"
        v-on="events"
      >
        {{ item[labelKey] }}
      </el-checkbox-button>
      <el-checkbox
        v-else
        :key="index"
        v-bind="item"
        :label="item[valueKey]"
        v-on="events"
      >
        {{ item[labelKey] }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
import { Checkbox, CheckboxGroup, CheckboxButton } from 'element-ui';
import dfCommon from '../mixins/df-common';
import dfOptions from '../mixins/df-options';

export default {
  name: 'DfCheckbox',
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [CheckboxButton.name]: CheckboxButton
  },
  mixins: [dfCommon, dfOptions],
  props: {
    /**
     * 值
     */
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped></style>
