<template>
  <div class="projects-page">
    <div class="container">
      <div class="projects-page__top">
        <create-project @after-create-project="handleAfterCreateProject" />
      </div>

      <div class="projects-page__content">
        <div v-if="projects.length" class="project-list">
          <project-item
            v-for="project in projects"
            :id="project.id"
            :key="project.id"
            :name="project.name"
            :description="project.description"
            :members="project.members"
            :languages="project.languages"
            class="project-item"
          />
        </div>
        <p v-else>Проектов нет</p>
      </div>
    </div>
  </div>
</template>

<script>
import CreateProject from './components/CreateProject'
import ProjectItem from './components/ProjectItem'
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'ProjectsPage',

  components: {
    CreateProject,
    ProjectItem
  },

  mixins: [mixinDefaultProps],

  async asyncData({ $axios }) {
    const projects = await $axios.$get('/api/v1/projects')
    return {
      projects
    }
  },

  methods: {
    handleTitleClick(id) {
      this.$router.push(`/projects/${id}`)
    },

    handleAfterCreateProject(project) {
      this.projects.unshift(project)
    }
  }
}
</script>

<style lang="scss" scoped>
.projects-page {
  padding-bottom: 32px;

  &__top {
    margin-bottom: 32px;
    padding-top: 32px;
  }
}

.project-item {
  margin-bottom: 34px;
}
</style>
