<template>
  <div class="admin-page">
    <div class="container">
      <h1 class="admin-page__title">{{ $t('admin').settings.title }}</h1>

      <div class="change-password">
        <h2 class="change-password__title">
          {{ $t('admin').settings.changePassword.title }}
        </h2>
        <el-form
          ref="changePasswordForm"
          :model="formModel"
          :rules="rules"
          label-position="top"
        >
          <el-form-item
            :label="$t('admin').settings.changePassword.current"
            prop="currentPassword"
            size="small"
          >
            <el-input
              v-model="formModel.currentPassword"
              placeholder="Enter the current password"
              size="small"
              show-password
              autofocus
            />
          </el-form-item>
          <el-form-item
            :label="$t('admin').settings.changePassword.new"
            prop="newPassword"
            size="small"
          >
            <el-input
              v-model="formModel.newPassword"
              placeholder="Enter a new password"
              size="small"
              show-password
            />
          </el-form-item>

          <el-form-item class="change-password__buttons">
            <el-button type="primary" @click="handleChangePasswordBtnClick">
              {{ $t('admin').settings.changePassword.btnName }}
            </el-button>
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
  name: 'SettingsPage',

  mixins: [mixinDefaultProps],

  data() {
    return {
      isLoading: true,
      isCurrentPasswordReal: true,
      formModel: {
        currentPassword: '',
        newPassword: ''
      },
      rules: {
        currentPassword: {
          required: true,
          trigger: 'blur',
          message: 'Пожалуйста заполните поле'
        },
        newPassword: {
          required: true,
          trigger: 'blur',
          message: 'Пожалуйста заполните поле'
        }
      }
    }
  },

  computed: {
    ...mapState('auth', ['currentUser'])
  },

  methods: {
    handleChangePasswordBtnClick() {
      this.$refs.changePasswordForm.validate(async (isValid) => {
        if (!isValid) return

        this.isLoading = true

        try {
          await this.$axios.$post(
            `/api/v1/users/change_password`,
            this.formModel
          )

          this.$notify({
            type: 'success',
            message: 'Пароль изменен'
          })
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'Ошибка при смене пароля'
          })
        }

        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.change-password {
  width: 368px;

  &__title {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 24px;
  }

  &__buttons {
    margin-top: 48px;
  }
}
</style>
