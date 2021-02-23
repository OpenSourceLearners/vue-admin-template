<template>
  <div class="app-container">
    <h2>动态列表</h2>
    <dynamic-table :data="data" :columns="columns">
      <!-- 状态列 -->
      <template slot="slot|isDisabled" slot-scope="{ row }">
        <el-switch v-model="row.isDisabled" />
      </template>
    </dynamic-table>
  </div>
</template>

<script>
import DynamicTable from '@/components/DynamicTable';
import { Switch } from 'element-ui';

export default {
  name: 'DynamicTableDemo',
  components: {
    [DynamicTable.name]: DynamicTable,
    [Switch.name]: Switch
  },
  data() {
    return {
      // 数据
      data: [
        {
          name: '张三',
          age: 26,
          introduce: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
          isDisabled: true
        },
        {
          name: '李四',
          age: 22,
          introduce: '介绍',
          isDisabled: false
        }
      ],
      // 列表列配置
      columns: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: '介绍',
          prop: 'introduce',
          'show-overflow-tooltip': true
        },
        {
          columnType: 'slot',
          label: '是否禁用',
          prop: 'isDisabled'
        },
        {
          columnType: 'btns',
          label: '操作',
          btns: [
            {
              label: '编辑',
              type: 'primary',
              size: 'mini'
            },
            {
              label: '删除',
              type: 'danger',
              size: 'mini'
            }
          ]
        }
      ]
    };
  }
};
</script>
