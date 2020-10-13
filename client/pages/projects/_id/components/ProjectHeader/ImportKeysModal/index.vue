<template>
  <div class="import-keys">
    <el-button
      class="custom-el-button icon-plus"
      type="primary"
      size="small"
      @click="isModalShown = true"
    >
      Upload
    </el-button>

    <el-dialog
      v-if="isModalShown"
      :visible.sync="isModalShown"
      title="Upload"
      width="480px"
    >
      <el-form
        ref="addProjectForm"
        :model="formModel"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="Name" prop="file" size="small">
          <el-upload
            class="import-keys__upload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Перетащите сюда файл или нажмите, чтобы загрузить
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Languages" prop="languages" size="small">
          <el-select
            v-model="formModel.languages"
            size="small"
            class="custom-full-width"
            multiple
            filterable
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
        <el-button type="primary">Upload</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixinRoleLogic from '../../../mixins/roleLogic'
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'ImportKeysModal',

  mixins: [mixinDefaultProps, mixinRoleLogic],

  data: () => ({
    isModalShown: false,
    fileList: [],
    formModel: {
      file: null,
      languages: []
    }
  }),

  computed: {
    ...mapState('languages', ['languages'])
  },

  methods: {
    handlePreview() {},

    handleRemove() {}
  }
}
</script>

<style lang="scss" scoped>
.import-keys {
  &__upload {
    /deep/ {
      .el-upload,
      .el-upload-dragger {
        display: block;
        width: 100%;
      }

      .el-icon-upload {
        margin-top: 0;
      }

      .el-upload-dragger {
        height: auto;
        padding: 60px 0;
      }
    }
  }
}
</style>
