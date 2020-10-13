<template>
  <div class="admin-page">
    <div class="container">
      <h1 class="admin-page__title">{{ $t('admin').support.title }}</h1>

      <div class="support-container">
        <el-form
          ref="supportForm"
          :model="formModel"
          :rules="rules"
          label-position="top"
        >
          <el-form-item label="Name" size="small">
            <el-input :value="formModel.name" size="small" disabled />
          </el-form-item>

          <el-form-item label="Email" size="small">
            <el-input :value="formModel.email" disabled />
          </el-form-item>

          <el-form-item label="Message" prop="message" size="small">
            <el-input
              v-model="formModel.message"
              type="textarea"
              size="small"
              placeholder="Enter message text"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">
              Отправить
            </el-button>
            <el-button type="danger" @click="resetForm">Очистить</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'SupportPage',

  mixins: [mixinDefaultProps],

  data() {
    return {
      formModel: {
        name: '',
        email: '',
        message: ''
      },

      rules: {
        name: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'blur'
          }
        ],
        message: [
          {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    ...mapState('auth', ['currentUser'])
  },

  mounted() {
    this.formModel.name = this.currentUser.name
    this.formModel.email = this.currentUser.email
  },

  methods: {
    submitForm() {
      this.$refs.supportForm.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },

    resetForm() {
      this.$refs.supportForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.support-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 32px;
}
</style>
