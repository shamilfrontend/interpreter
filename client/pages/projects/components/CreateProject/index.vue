<template>
  <div class="create-project">
    <el-button
      class="create-project__open custom-el-button icon-plus"
      size="small"
      @click="handleAddProjectBtnClick"
    >
      {{ $t('admin').projects.createBtnName }}
    </el-button>

    <el-dialog
      :title="$t('admin').projects.createBtnName"
      :visible.sync="isAddProjectModalShown"
      width="480px"
    >
      <el-form
        ref="addProjectForm"
        :model="formModel"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="Name" prop="name" size="small">
          <el-input
            v-model="formModel.name"
            size="small"
            placeholder="Enter project name..."
            clearable
          />
        </el-form-item>
        <el-form-item label="Description" prop="name" size="small">
          <el-input
            v-model="formModel.description"
            size="small"
            placeholder="Enter project description..."
            clearable
          />
        </el-form-item>
        <el-form-item label="Languages" prop="languages" size="small">
          <el-select
            v-model="formModel.languages"
            size="small"
            class="custom-full-width"
            multiple
            filterable
            placeholder="Choose languages"
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
        <div class="create-project__btn-group">
          <el-button
            :loading="isLoading"
            size="small"
            @click="isAddProjectModalShown = false"
          >
            Cancel
          </el-button>
          <el-button
            type="primary"
            :loading="isLoading"
            size="small"
            @click="handleCreateProjectBtnClick"
          >
            Add project
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'CreateProject',

  data: () => ({
    isLoading: false,
    isAddProjectModalShown: false,
    formModel: {
      name: '',
      description: '',
      languages: ''
    },
    rules: {
      name: [
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
    }
  }),

  computed: {
    ...mapState('languages', ['languages']),
    ...mapState('projects', ['projects'])
  },

  methods: {
    ...mapActions('projects', ['createProject']),

    handleAddProjectBtnClick() {
      this.isAddProjectModalShown = true
    },

    handleCreateProjectBtnClick() {
      this.$refs.addProjectForm.validate(async (isValid) => {
        if (!isValid) return

        this.isLoading = true

        try {
          const response = await this.createProject(this.formModel)
          this.$emit('after-create-project', response)

          this.$notify({
            type: 'success',
            message: 'Проект создан'
          })

          this.isAddProjectModalShown = false
          this.clearFormData()
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'Ошибка при создании проекта'
          })
        }

        this.isLoading = false
      })
    },

    clearFormData() {
      this.formModel.name = ''
      this.formModel.description = ''
      this.formModel.languages = []
    }
  }
}
</script>

<style lang="scss" scoped>
.create-project {
  display: flex;
  justify-content: flex-end;

  &__open {
  }

  &__btn-group {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
