<template>
  <header class="admin-header">
    <div v-if="currentUser.id === 1" class="admin-header__demo">
      Демо-версия
    </div>
    <div class="container admin-header__inner">
      <nuxt-link to="/" class="header-logo">
        <img class="header-logo__image" src="/logo.svg" alt="logo" />
        <span class="header-logo__name">Localization</span>
      </nuxt-link>

      <nav class="header-menu">
        <nuxt-link
          v-for="(item, index) in mainMenu"
          :key="index"
          class="header-menu__link"
          :to="localePath(item.link)"
        >
          {{ item.text }}
        </nuxt-link>
      </nav>

      <div v-if="false" class="switch-lang">
        <nuxt-link :to="switchLocalePath('ru')" class="switch-lang__item">
          <img class="switch-lang__image" src="/languages/ru.svg" alt="ru" />
        </nuxt-link>
        <nuxt-link :to="switchLocalePath('en')" class="switch-lang__item">
          <img class="switch-lang__image" src="/languages/en.svg" alt="en" />
        </nuxt-link>
      </div>

      <div v-if="false" class="notifications">
        <el-badge value="3">
          <el-button
            icon="el-icon-message-solid"
            size="small"
            circle
            @click="isNotifyDrawerShown = true"
          />
        </el-badge>

        <el-drawer
          v-if="isNotifyDrawerShown"
          :title="notificationTitle"
          :visible.sync="isNotifyDrawerShown"
        >
        </el-drawer>
      </div>

      <div class="user-info">
        <span class="user-info__name">{{ currentUser.name }}</span>
        <div
          class="user-info__avatar"
          :style="`background-color: ${currentUser.color}`"
        >
          {{ getAvatarName() }}
        </div>
        <div class="dropdown-menu">
          <nuxt-link :to="localePath('/settings')" class="dropdown-menu__item">
            {{ userMenuSettings }}
          </nuxt-link>
          <button class="dropdown-menu__item" @click="handleLogoutBtnClick">
            {{ userMenuLogOut }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getAvatarName } from '@/common/helpers'

export default {
  name: 'TheAdminHeader',

  data: () => ({
    isNotifyDrawerShown: false
  }),

  computed: {
    ...mapState('auth', ['currentUser']),

    mainMenu() {
      return this.$t('admin').header.menu
    },
    notificationTitle() {
      return this.$t('admin').header.notifications.title
    },
    userMenuSettings() {
      return this.$t('admin').header.userMenu.settings
    },
    userMenuLogOut() {
      return this.$t('admin').header.userMenu.logout
    }
  },

  methods: {
    ...mapActions('auth', ['logout']),

    async handleLogoutBtnClick() {
      try {
        await this.$axios.$post('/api/v1/users/logout')
        await this.logout()
        this.$router.push('/')
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при выхода'
        })
      }
    },

    getAvatarName() {
      return getAvatarName(this.currentUser.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/mixins/avatarStyles';

.admin-header {
  &__demo {
    padding: 8px 16px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
    background-color: var(--color-blue);
    letter-spacing: 0.2px;
  }

  &__inner {
    display: flex;
    align-items: center;
  }
}

.header-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-blue);

  &__image {
    display: block;
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }

  &__name {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
}

.header-menu {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: auto;
  margin-right: 100px;

  &__link {
    padding: 18px;
    font-size: 16px;
    transition: color 0.2s linear;
    color: #9d9d9d;
    text-decoration: none;

    &:hover,
    &.nuxt-link-active {
      color: var(--color-blue);
    }
  }
}

.switch-lang {
  display: flex;
  align-items: center;
  margin-left: auto;

  &__item {
    margin-left: 8px;
  }

  &__image {
    display: block;
  }
}

.notifications {
  /deep/ .el-button {
    i {
      font-size: 18px;
    }
  }
}

.user-info {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 0;

  &__name {
    font-size: 18px;
  }

  &__avatar {
    @include avatarStyles;

    margin-left: 12px;
  }

  &:hover .dropdown-menu {
    display: block;
  }
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 2;
  background-color: #fff;
  display: none;
  border: 1px solid #eee;

  &__item {
    text-align: left;
    width: 100%;
    display: block;
    background-color: transparent;
    border: none;
    text-decoration: none;
    padding: 15px 50px;
    line-height: 14px;
    font-size: 14px;
    color: #000000;
  }
}
</style>
