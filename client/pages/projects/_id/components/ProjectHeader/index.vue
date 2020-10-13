<template>
  <div class="project-header">
    <div class="project-header__top">
      <project-breadcrumb />

      <button
        v-if="!isSettingsPage"
        class="project-header__setting"
        @click="handleSettingBtnClick"
      />

      <button
        v-if="isDeveloper || isTranslator"
        class="project-header__logout"
        @click="handleSettingBtnClick"
      />

      <el-input
        v-model="searchValue"
        class="project-header__search"
        type="search"
        placeholder="Поиск ключей..."
        size="small"
      />
    </div>

    <div v-if="!isTranslator" class="project-header__buttons">
      <create-keys-modal />
      <import-keys-modal />
      <export-keys />
    </div>
  </div>
</template>

<script>
import mixinRoleLogic from '../../mixins/roleLogic'

import ProjectBreadcrumb from './ProjectBreadcrumb'
import CreateKeysModal from './CreateKeysModal'
import ImportKeysModal from './ImportKeysModal'
import ExportKeys from './ExportKeys'

export default {
  name: 'ProjectHeader',

  components: {
    ProjectBreadcrumb,
    CreateKeysModal,
    ImportKeysModal,
    ExportKeys
  },

  mixins: [mixinRoleLogic],

  data() {
    return {
      searchValue: ''
    }
  },

  computed: {
    isSettingsPage() {
      return this.$route.fullPath.includes('settings')
    }
  },

  methods: {
    handleSettingBtnClick() {
      this.$router.push(`/projects/${this.$route.params.id}/settings`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/mixins/buttonDefaultStylesReset';

.project-header {
  &__top {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  &__setting {
    @include buttonDefaultStylesReset;

    position: relative;
    width: 16px;
    height: 16px;
    margin-left: 8px;
    background-image: url('/icons/icon-settings.svg');
    background-repeat: no-repeat;
    background-position: center;
  }

  &__logout {
    @include buttonDefaultStylesReset;

    position: relative;
    width: 16px;
    height: 16px;
    margin-left: 8px;
    background-image: url('/icons/icon-settings.svg');
    background-repeat: no-repeat;
    background-position: center;
  }

  &__search {
    width: 370px;
    margin-left: auto;

    /deep/ .el-input {
      &__inner {
        height: 36px;
        padding-left: 36px;
        background-color: #fafbfc;
        border: 1px solid #dfe1e6;
        border-radius: 3px;
        color: #97a0af;
        background-image: url('/icons/icon-search.svg');
        background-repeat: no-repeat;
        background-position: 10px center;
      }
    }
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 12px;
  }

  &__export,
  &__import {
    margin-left: 16px;

    &.nuxt-link-exact-active {
      opacity: 0.8;
    }
  }
}
</style>
