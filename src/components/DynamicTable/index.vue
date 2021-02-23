<template>
  <el-table ref="elTable" v-bind="$attrs" v-on="$listeners">
    <!-- 动态渲染列 -->
    <template v-for="(column, index) in columns">
      <!-- 动态插槽列 -->
      <el-table-column
        v-if="column.columnType === 'slot'"
        :key="index"
        v-bind="column"
      >
        <template slot-scope="scope">
          <slot
            v-bind="scope"
            :name="`slot|${column.slotName || column.prop}`"
          />
        </template>
      </el-table-column>
      <!-- 动态按钮列 -->
      <el-table-column
        v-else-if="column.columnType === 'btns'"
        :key="index"
        v-bind="column"
      >
        <template slot-scope="scope">
          <template v-for="(btn, i) in column.btns">
            <el-button
              v-if="isShowBtn(btn.hidden)"
              :key="`${index}${i}`"
              v-bind="btn"
              @click.stop="typeof btn === 'function' && btn.click(scope.row, scope.$index)"
            >
              {{ btn.label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
      <!-- 普通列 -->
      <el-table-column v-else :key="index" v-bind="column" />
    </template>
  </el-table>
</template>

<script>
import { Table, TableColumn } from 'element-ui';
export default {
  name: 'DynamicTable',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props: {
    /**
     * 列配置
     */
    columns: {
      type: Array,
      default: () => []
    }
  },
  activated() {
    // 解决缓存切换错位问题
    this.doLayout();
  },
  methods: {
    /**
     * 是否显示按钮
     * @param {*} hidden 是否隐藏参数
     */
    isShowBtn(hidden) {
      if (typeof hidden !== 'function') return !hidden;
      return !hidden();
    },
    /**
     * 重新渲染
     */
    doLayout() {
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.doLayout();
      });
    }
  }
};
</script>
