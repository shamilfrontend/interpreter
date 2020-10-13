<template>
  <div class="project-page">
    <div class="container">
      <project-header />
      <nuxt />
      <project-keys />
    </div>
  </div>
</template>

<script>
import mixinFetchProjectByID from './mixins/fetchProjectByID'
import ProjectHeader from './components/ProjectHeader'
import ProjectKeys from './components/ProjectKeys'
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'AdminProjectsPage',

  components: {
    ProjectHeader,
    ProjectKeys
  },

  mixins: [mixinFetchProjectByID, mixinDefaultProps],

  mounted() {
    this.getProjectByID()
  }
}
</script>

<style lang="scss" scoped>
.project-page {
  padding: 32px 0;
}
</style>
