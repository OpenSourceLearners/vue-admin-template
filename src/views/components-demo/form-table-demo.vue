<template>
  <div class="app-container">
    <h2>动态列表</h2>
    <form-table
      :init-query-params="initQueryParams"
      :form-items="formItems"
      :columns="columns"
      :get-table-data="getTableData"
    >
      <!-- 状态列 -->
      <template slot="slot|isDisabled" slot-scope="{ row }">
        <el-switch v-model="row.isDisabled" />
      </template>
    </form-table>
  </div>
</template>

<script>
import FormTable from '@/components/FormTable';
import { Switch } from 'element-ui';

export default {
  name: 'FormTableDemo',
  components: {
    [Switch.name]: Switch,
    [FormTable.name]: FormTable
  },
  data() {
    return {
      // 查询表单配置
      formItems: [
        {
          type: 'input',
          label: '姓名',
          field: 'name'
        },
        {
          type: 'select',
          label: '是否禁用',
          field: 'isDisabled',
          options: [
            {
              label: '启用',
              value: true
            },
            {
              label: '禁用',
              value: false
            }
          ],
          attrs: {
            clearable: true
          }
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
      ],
      // 初始化查询参数
      initQueryParams: {
        isDisabled: true
      }
    };
  },
  methods: {
    /**
     * 获取列表数据
     */
    getTableData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            total: 2,
            list: [
              {
                name: '张三',
                age: 26,
                introduce:
                  '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                isDisabled: true
              },
              {
                name: '李四',
                age: 22,
                introduce: '介绍',
                isDisabled: false
              }
            ]
          });
        }, 1000 + Math.floor(Math.random() * 2000));
      });
    }
  }
};
</script>
