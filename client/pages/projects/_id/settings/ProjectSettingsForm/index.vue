<template>
  <div class="project-settings-form">
    <h2 class="project-settings-form__title">Project</h2>
    <el-form
      ref="projectSettingForm"
      :model="formModel"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="Name" prop="name" size="small">
        <el-input
          v-model="formModel.name"
          size="small"
          placeholder="Введите название проекта"
          clearable
        />
      </el-form-item>
      <el-form-item label="Description" prop="description" size="small">
        <el-input
          v-model="formModel.description"
          size="small"
          placeholder="Введите описание проекта"
          clearable
        />
      </el-form-item>
      <el-form-item label="Languages" prop="languages" size="small">
        <el-select
          v-model="formModel.languages"
          class="custom-full-width"
          multiple
          size="small"
          placeholder="Выберите языки"
          clearable
        >
          <el-option
            v-for="language in languages"
            :key="language.id"
            :label="language.name"
            :value="language.id"
          />
        </el-select>
      </el-form-item>
      <div>
        <el-button
          v-if="isOwner"
          class="project-settings-form__btn project-settings-form__btn_delete"
          type="danger"
          :loading="isLoading"
          size="small"
          @click="handleDeleteProjectBtnClick"
        >
          Delete
        </el-button>
        <el-button
          class="project-settings-form__btn"
          type="primary"
          :loading="isLoading"
          size="small"
          @click="handleSaveProjectBtnClick"
        >
          Save
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import mixinRoleLogic from '../../mixins/roleLogic'

export default {
  name: 'ProjectSettingsForm',

  mixins: [mixinRoleLogic],

  data: () => ({
    formModel: {
      name: '',
      description: '',
      languages: []
    },

    rules: {
      name: [
        {
          required: true,
          message: 'Пожалуйста заполните поле',
          trigger: 'blur'
        }
      ],
      description: [
        {
          required: true,
          message: 'Пожалуйста заполните поле',
          trigger: 'blur'
        }
      ],
      languages: [
        {
          required: true,
          message: 'Пожалуйста заполните поле',
          trigger: 'blur'
        }
      ]
    },

    isLoading: false
  }),

  computed: {
    ...mapState('projects', {
      projectId: (state) => state.openedProject.id,
      projectName: (state) => state.openedProject.name,
      projectDescription: (state) => state.openedProject.description,
      projectLanguages: (state) => state.openedProject.languages
    }),
    ...mapState('languages', ['languages'])
  },

  watch: {
    projectName: {
      handler(name) {
        this.formModel.name = name
      },
      immediate: true
    },
    projectDescription: {
      handler(description) {
        console.log('description', description)
        this.formModel.description = description
      },
      immediate: true
    },
    projectLanguages: {
      handler(languages) {
        languages.forEach(({ id }) => {
          if (!this.formModel.languages.includes(id)) {
            this.formModel.languages.push(id)
          }
        })
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions('projects', ['updateProjectById']),

    handleSaveProjectBtnClick() {
      this.$refs.projectSettingForm.validate(async (isValid) => {
        if (!isValid) return

        try {
          await this.updateProjectById({
            name: this.formModel.name,
            languages: this.formModel.languages
          })

          this.$notify({
            type: 'success',
            message: 'Project is saved'
          })
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'error'
          })
        }
      })
    },

    handleDeleteProjectBtnClick() {
      this.$confirm(
        'При удалении проекта, будут удалены все ключи и переводы.',
        'Вы действительно хотите удалить проект?',
        {
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          type: 'warning'
        }
      )
        .then(async () => {
          try {
            await this.$axios.$delete(`/api/v1/projects/${this.projectId}`)

            this.$notify({
              type: 'success',
              message: 'Проект удален'
            })

            this.$router.push('/projects')
          } catch (e) {
            this.$notify({
              type: 'error',
              message: 'Ошибка при удалении проекта'
            })
          }
        })
        .catch(() => {
          // do nothing
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/mixins/buttonDefaultStylesReset';

.project-settings-form {
  &__title {
    margin-bottom: 16px;
  }

  &__btn {
    padding: 8px 12px;
    color: #ffffff;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    background-repeat: no-repeat;

    &_delete {
      padding: 8px 11px 8px 36px;
      background-color: #de350b;
      background-image: url('/icons/icon-trash-small-white.svg');
      background-position: 10px center;
    }
  }
}
</style>
