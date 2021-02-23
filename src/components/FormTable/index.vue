<template>
  <div>
    <!-- 列表查询表单 -->
    <dynamic-form
      refs="dynamicForm"
      :form-model="queryParams"
      :form-items="formItems"
      :form-attrs="mergeFormAttrs"
    >
      <el-form-item>
        <el-button @click="onQuery">搜索</el-button>
      </el-form-item>
    </dynamic-form>
    <!-- 列表 -->
    <dynamic-table v-loading="loading" :data="tableData" :columns="columns">
      <template
        v-for="(column, index) in columns"
        :slot="`slot|${column.slotName || column.prop}`"
        slot-scope="scope"
      >
        <slot
          v-if="column.columnType === 'slot'"
          v-bind="scope"
          :name="`slot|${column.slotName || column.prop}`"
        />
      </template>
    </dynamic-table>
    <!-- 分页 -->
    <pagination
      :total="total"
      :limit.sync="limit"
      :page.sync="pageParams.page"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { FormItem, Loading } from 'element-ui';
import DynamicForm from '../DynamicForm';
import DynamicTable from '../DynamicTable';
import Pagination from '../Pagination';

Vue.use(Loading);

export default {
  name: 'FormTable',
  components: {
    [FormItem.name]: FormItem,
    DynamicForm,
    DynamicTable,
    Pagination
  },
  props: {
    /**
     * 初始化查询参数
     */
    initQueryParams: {
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
    },
    /**
     * 列配置
     */
    columns: {
      type: Array,
      default: () => []
    },
    // 每页条数
    limit: {
      type: Number,
      default: 10
    },
    /**
     * 立即查询
     */
    immediate: {
      type: Boolean,
      default: true
    },
    /**
     * 获取列表数据
     */
    getTableData: {
      type: Function,
      default: null
    },
    /**
     * 列表键名
     */
    listKey: {
      type: String,
      default: 'list'
    },
    /**
     * 总数键名
     */
    totalKey: {
      type: String,
      default: 'total'
    }
  },
  data() {
    return {
      // 分页参数
      pageParams: {
        page: 1, // 页数
        limit: this.limit
      },
      // 查询参数
      queryParams: {
        ...this.initQueryParams
      },
      // 总条数
      total: 0,
      // 列表数据
      tableData: [],
      // 最后一次请求
      lastRequest: null
    };
  },
  computed: {
    /**
     * 加载中
     */
    loading() {
      return !!this.lastRequest;
    },
    /**
     * 合并表单数据
     */
    mergeFormAttrs() {
      return {
        inline: true,
        size: 'small',
        ...this.formAttrs
      };
    }
  },
  watch: {
    /**
     * 每页条数变化
     */
    'pageParams.limit'() {},
    /**
     *  页数变化
     */
    'pageParams.page'() {}
  },
  created() {
    this.fetchTableData();
  },
  methods: {
    /**
     * 查询
     */
    onQuery() {
      const { page } = this.pageParams;
      page === 1 ? this.fetchTableData() : (this.pageParams.page = 1);
    },
    /**
     * 获取列表数据
     */
    fetchTableData() {
      (this.$refs.dynamicForm
        ? this.$refs.dynamicForm.validate() // 校验表单
        : Promise.resolve()
      ).then(() => {
        // 判断是否是方法
        if (typeof this.getTableData !== 'function') {
          this.tableData = [];
          return;
        }
        const res = this.getTableData();
        // 处理结果数据
        const dealData = data => {
          this.tableData = Array.isArray(data[this.listKey])
            ? data[this.listKey]
            : []; // 设置列表数据
          this.total = data[this.totalKey] || 0; // 设置总条数
        };
        // 是否是异步对象
        if (res instanceof Promise) {
          this.lastRequest = res;
          res
            .then(data => {
              if (res !== this.lastRequest) return null;
              dealData(data);
              this.lastRequest = null;
            })
            .catch(error => {
              console.error(error);
              this.tableData = [];
            })
            .finally(() => {
              if (res === this.lastRequest) {
                this.lastRequest = null;
              }
            });
        } else {
          dealData(res);
        }
      });
    },
    /**
     * 刷新列表
     */
    refreshTable() {
      this.fetchTableData();
    }
  }
};
</script>
