<template>
    <form :class="classes" :autocomplete="autocomplete">
        <slot></slot>
    </form>
</template>
<script>
  // https://github.com/ElemeFE/element/blob/dev/packages/form/src/form.vue
  import { oneOf } from '../../utils/assist'

  const prefixCls = 'ivu-form'

  export default {
    name: 'iForm',
    props: {
      // 要校验的字段
      model: {
        type: Object
      },
      // 校验规则
      rules: {
        type: Object
      },
      // label长度
      labelWidth: {
        type: Number
      },
      // label的位置
      labelPosition: {
        validator (value) {
          return oneOf(value, ['left', 'right', 'top'])
        },
        default: 'right'
      },
      // 同行
      inline: {
        type: Boolean,
        default: false
      },
      // 是否显示错误信息
      showMessage: {
        type: Boolean,
        default: true
      },
      // 自动完成
      autocomplete: {
        validator (value) {
          return oneOf(value, ['on', 'off'])
        },
        default: 'off'
      }
    },
    data () {
      return {
        fields: []
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          `${prefixCls}-label-${this.labelPosition}`,
          {
            [`${prefixCls}-inline`]: this.inline
          }
        ]
      }
    },
    methods: {
      resetFields () {
        this.fields.forEach(field => {
          field.resetField()
        })
      },
      // 这个在父组件中调用
      validate (callback) {
        return new Promise(resolve => {
          let valid = true
          let count = 0
          this.fields.forEach(field => {
            field.validate('', errors => {
              if (errors) {
                valid = false
              }
              if (++count === this.fields.length) {
                // all finish
                resolve(valid)
                if (typeof callback === 'function') {
                  callback(valid)
                }
              }
            })
          })
        })
      },
      validateField (prop, cb) {
        const field = this.fields.filter(field => field.prop === prop)[0]
        if (!field) { throw new Error('[iView warn]: must call validateField with valid prop string!') }

        field.validate('', cb)
      }
    },
    watch: {
      rules () {
        this.validate()
      }
    },
    // 绑定事件
    created () {
      this.$on('on-form-item-add', (field) => {
        if (field) this.fields.push(field)
        return false
      })
      this.$on('on-form-item-remove', (field) => {
        if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
        return false
      })
    }
  }
</script>
