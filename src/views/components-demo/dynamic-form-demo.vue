<template>
  <div class="app-container">
    <h2>动态表单栗子</h2>
    <dynamic-form
      ref="dynamicForm"
      :form-model="formData"
      :form-items="formItems"
      :form-attrs="formAttrs"
      @change-model="onChangeModel"
    >
      <template slot="slot|photo" slot-scope="{ data }">
        <image-upload v-model="data.photo" url-field="data.fileUrl" action="http://campus.hailiangedu.com:8092/simsbff/file/uploadSingle" />
      </template>
    </dynamic-form>
    <el-button type="primary" @click="onConfirm">提交</el-button>
    <el-button @click="onReset">重置</el-button>
  </div>
</template>

<script>
import DynamicForm from '@/components/DynamicForm';
import ImageUpload from '@/components/ImageUpload';

export default {
  name: 'DynamicFormDemo',
  components: {
    DynamicForm,
    ImageUpload
  },
  data() {
    return {
      // 表单数据
      formData: {
        // 下拉框多选需要初始化数据，否则会立即触发校验
        familyMember: []
      },
      // 表单元素配置
      formItems: [
        // 输入框
        {
          type: 'input',
          label: '姓名',
          field: 'name',
          rules: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入姓名'
            }
          ]
        },
        // 单选框
        {
          type: 'radio',
          label: '性别',
          field: 'sex',
          rules: [
            {
              required: true,
              trigger: 'change',
              message: '请选择性别'
            }
          ],
          // 选项配置数组
          options: [
            {
              label: '男',
              value: '1'
            },
            {
              label: '女',
              value: '0'
            }
          ]
        },
        // 多选框
        {
          type: 'checkbox',
          label: '爱好',
          field: 'like',
          rules: [
            {
              type: 'array',
              required: true,
              trigger: 'change',
              message: '请选择爱好'
            }
          ],
          // 选项获取方法
          options() {
            return [
              {
                label: '读书',
                value: 'ds'
              },
              {
                label: '看电影',
                value: 'kdy'
              },
              {
                label: '游泳',
                value: 'yy'
              },
              {
                label: '购物',
                value: 'gw'
              }
            ];
          }
        },
        // 下拉框
        {
          type: 'select',
          label: '民族',
          field: 'nation',
          rules: [
            {
              required: true,
              trigger: 'change',
              message: '请选择民族'
            }
          ],
          // 异步获取选项方法
          options() {
            return new Promise((resolve, reject) => {
              // 模拟接口
              setTimeout(() => {
                resolve([
                  {
                    label: '汉族',
                    value: 'hz'
                  },
                  {
                    label: '满族',
                    value: 'mz'
                  },
                  {
                    label: '维吾尔族',
                    value: 'wwez'
                  }
                ]);
              }, 2000);
            });
          },
          events: {
            /**
             * 选择改变
             * @param {*} model 数据模型
             * @param {*} value 值
             */
            change(model, value) {
              console.log('--------------- 民族选择改变 start -------------')
              console.log(model);
              console.log(value);
              console.log('--------------- 民族选择改变 end -------------')
            }
          }
        },
        // 下拉框-多选
        {
          type: 'select',
          label: '家庭成员',
          field: 'familyMember',
          attrs: {
            multiple: true
          },
          rules: [
            {
              required: true,
              trigger: 'change',
              message: '请选择'
            }
          ],
          options: [
            {
              label: '父亲',
              value: 'fq'
            },
            {
              label: '母亲',
              value: 'mq'
            },
            {
              label: '哥哥',
              value: 'gg'
            },
            {
              label: '姐姐',
              value: 'jj'
            },
            {
              label: '弟弟',
              value: 'dd'
            },
            {
              label: '妹妹',
              value: 'mm'
            }
          ]
        },
        // 日期组件
        {
          type: 'date-picker',
          label: '出生日期',
          field: 'birthday',
          rules: [
            {
              required: true,
              trigger: 'change',
              message: '请选择出生日期'
            }
          ]
        },
        // 自定义插槽
        {
          type: 'slot',
          label: '头像',
          field: 'photo',
          rules: [
            {
              required: true,
              trigger: 'change',
              message: '请上传头像'
            }
          ]
        }
      ],
      // 表单属性
      formAttrs: {
        'label-width': '120px'
      }
    };
  },
  watch: {},
  created() {
  },
  methods: {
    /**
     * 数据改变
     */
    onChangeModel(model, value, field) {
      // this.formData = model;
      console.log('--------------- 表单数据改变 start -------------')
      console.log(model);
      console.log(value);
      console.log(field);
      console.log('--------------- 表单数据改变 end -------------')
      this.formData = model;
    },
    /**
     * 提交
     */
    onConfirm() {
      this.$refs.dynamicForm.validate().then(() => {
        console.log(this.formData);
      });
    },
    /**
     * 重置
     */
    onReset() {
      this.$refs.dynamicForm.resetFields();
    }
  }
};
</script>
