<template>
  <el-radio-group v-model="val" v-bind="attrs" v-on="events">
    <template v-for="(item, index) in options">
      <el-radio-button
        v-if="config.radioButton"
        :key="index"
        v-bind="item"
        :label="item[valueKey]"
      >
        {{ item[labelKey] }}
      </el-radio-button>
      <el-radio v-else :key="index" v-bind="item" :label="item[valueKey]">
        {{ item[labelKey] }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script>
import { Radio, RadioGroup, RadioButton } from 'element-ui';
import dfCommon from '../mixins/df-common';
import dfOptions from '../mixins/df-options';

export default {
  name: 'DfRadio',
  components: {
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton
  },
  mixins: [dfCommon, dfOptions],
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {}
};
</script>
