<template>
  <el-date-picker v-model="val" v-bind="attrs" v-on="events" />
</template>

<script>
import { DatePicker } from 'element-ui';
import dfCommon from '../mixins/df-common';

export default {
  name: 'DfDatePicker',
  components: {
    [DatePicker.name]: DatePicker
  },
  mixins: [dfCommon],
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped></style>
