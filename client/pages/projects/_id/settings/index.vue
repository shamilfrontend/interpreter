<template>
  <div class="project-settings">
    <div class="container">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item
          class="breadcrumb__item"
          :to="{ path: '/projects' }"
        >
          Projects
        </el-breadcrumb-item>
        <el-breadcrumb-item
          class="breadcrumb__item"
          :to="{ path: `/projects/${id}` }"
        >
          {{ name }}
        </el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrumb__item">
          Settings
        </el-breadcrumb-item>
      </el-breadcrumb>
      <project-settings-form class="project-settings__form" />
      <project-members class="project-settings__members" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import mixinFetchProjectByID from '../mixins/fetchProjectByID'
import mixinRoleLogic from '../mixins/roleLogic'
import ProjectSettingsForm from './ProjectSettingsForm'
import ProjectMembers from './ProjectMembers'
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'ProjectSettings',

  components: {
    ProjectSettingsForm,
    ProjectMembers
  },

  mixins: [mixinRoleLogic, mixinFetchProjectByID, mixinDefaultProps],

  computed: {
    ...mapState('projects', {
      id: (state) => state.openedProject.id,
      name: (state) => state.openedProject.name
    })
  },

  mounted() {
    this.getProjectByID()
  }
}
</script>

<style lang="scss" scoped>
.project-settings {
  &__form {
    width: 210px;
    margin-top: 30px;
  }

  &__members {
    margin-top: 30px;
  }
}
</style>
