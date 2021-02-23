<template>
  <el-input
    v-if="attrs.type === 'number'"
    v-model.number="val"
    v-bind="attrs"
    v-on="events"
  />
  <el-input v-else v-model.trim="val" v-bind="attrs" v-on="events" />
</template>

<script>
import { Input } from 'element-ui';
import dfCommon from '../mixins/df-common';

export default {
  name: 'DfInput',
  components: {
    [Input.name]: Input
  },
  mixins: [dfCommon],
  data() {
    return {};
  }
};
</script>
