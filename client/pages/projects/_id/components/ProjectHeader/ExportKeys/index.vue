<template>
  <div>
    <el-button
      class="custom-el-button icon-plus"
      type="primary"
      size="small"
      @click="handleOpenExportBtnClick"
    >
      Download
    </el-button>

    <export-keys-modal
      v-if="isModalShown"
      :is-modal-shown="isModalShown"
      @close="isModalShown = false"
    />
  </div>
</template>

<script>
import mixinFetchProjectByID from '../../../mixins/fetchProjectByID'
import ExportKeysModal from './ExportKeysModal'

import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'ExportKeys',

  components: {
    ExportKeysModal
  },

  mixins: [mixinDefaultProps, mixinFetchProjectByID],

  data: () => ({
    isModalShown: false
  }),

  methods: {
    async handleOpenExportBtnClick() {
      await this.getProjectByID()
      this.isModalShown = true
    }
  }
}
</script>
