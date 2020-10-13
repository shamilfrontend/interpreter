<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item class="breadcrumb__item" :to="{ path: '/projects' }">
      Projects
    </el-breadcrumb-item>
    <el-breadcrumb-item
      class="breadcrumb__item"
      :to="{ path: `/projects/${id}` }"
    >
      {{ name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProjectBreadcrumb',

  computed: {
    ...mapState('projects', {
      id: (state) => state.openedProject.id,
      name: (state) => state.openedProject.name
    })
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__item {
    color: #8993a4;
  }
}
</style>
