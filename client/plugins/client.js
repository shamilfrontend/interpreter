import Vue from 'vue'
import vClickOutside from 'v-click-outside'

import dateFilter from '~/common/filters/date.filter'

Vue.use(vClickOutside)

Vue.filter('date', dateFilter)
