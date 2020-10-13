<template>
  <div class="admin-wrapper">
    <the-admin-header />
    <div class="admin-wrapper__content">
      <nuxt />
    </div>
    <the-admin-footer />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import TheAdminHeader from '@/components/TheAdminHeader'
import TheAdminFooter from '@/components/TheAdminFooter'

export default {
  name: 'AdminLayout',

  components: {
    TheAdminHeader,
    TheAdminFooter
  },

  created() {
    this.$store.dispatch('auth/getCurrentUser').catch(() => {
      this.logout()
      this.$router.push('/signin')
    })
    this.getLanguages()
  },

  methods: {
    ...mapActions('languages', ['getLanguages']),
    ...mapActions('auth', ['logout']),
    ...mapMutations('auth', ['setUser'])
  }
}
</script>

<style lang="scss" scoped>
.admin-wrapper {
  &__content {
    min-height: calc(100vh - 71px - 48px);
  }
}
</style>
