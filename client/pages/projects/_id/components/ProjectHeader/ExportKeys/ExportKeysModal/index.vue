<template>
  <el-dialog
    class="export-keys-modal"
    :visible="isModalShown"
    title="Экспорт ключей"
    width="922px"
    center
    @close="$emit('close')"
  >
    <div>
      <div class="export-keys-modal__content">
        <div class="export-keys-modal__formats">
          <h3 class="export-keys-modal__section-title">Выбрать формат</h3>
          <el-radio-group v-model="selectedFormats">
            <el-radio
              v-for="format in formats"
              :key="format.id"
              :label="format.type"
            >
              {{ format.name }}
            </el-radio>
          </el-radio-group>
        </div>

        <div class="export-keys-modal__languages">
          <h3 class="export-keys-modal__section-title">Выбрать языки</h3>
          <el-checkbox
            v-model="isAllLanguagesSelected"
            class="export-keys-modal__languages-all"
            @change="handleCheckAllChange"
          >
            Выбрать все языки
          </el-checkbox>

          <div class="languages">
            <div
              v-for="language in languages"
              :key="language.id"
              class="languages__item"
            >
              <el-checkbox
                :value="selectedLanguages.includes(language.id)"
                :label="language.id"
                @change="handleLanguageChange(language.id)"
              >
                <img
                  :src="`/languages/${language.code}.svg`"
                  :alt="language.name"
                  class="languages__img"
                />
                <span class="languages__name">{{ language.name }}</span>
                <span>
                  Переведено ключей {{ language.quantityCompletedWords }} из
                  {{ language.quantityWords }}
                </span>
              </el-checkbox>
            </div>
          </div>
        </div>
      </div>

      <div class="export-keys-modal__buttons">
        <el-button
          type="primary"
          :disabled="isDisabled"
          @click="handleExportBtnClick"
        >
          Download
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

import mixinRoleLogic from '../../../../mixins/roleLogic'
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'ExportKeysModal',

  mixins: [mixinDefaultProps, mixinRoleLogic],

  props: {
    isModalShown: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    formats: [
      {
        type: 'strings',
        name: '.strings'
      },
      {
        type: 'xml',
        name: '.xml'
      },
      {
        type: 'po',
        name: '.po'
      },
      {
        type: 'xliff',
        name: '.xliff'
      }
    ],

    selectedFormats: 'strings',
    isAllLanguagesSelected: true,
    selectedLanguages: []
  }),

  computed: {
    ...mapState('projects', {
      languages: (state) => state.openedProject.languages,
      keys: (state) => state.openedProject.keys
    }),

    isDisabled() {
      return !this.selectedFormats.length || !this.selectedLanguages.length
    },

    languagesIds() {
      return this.languages.map(({ id }) => id)
    }
  },

  watch: {
    selectedLanguages() {
      this.isAllLanguagesSelected =
        this.selectedLanguages.length === this.languagesIds.length
    }
  },

  mounted() {
    this.selectedLanguages = this.isAllLanguagesSelected
      ? this.languagesIds
      : []
  },

  methods: {
    handleCheckAllChange(isChecked) {
      this.selectedLanguages = isChecked ? this.languagesIds : []
    },

    handleLanguageChange(languageId) {
      if (!this.selectedLanguages.includes(languageId)) {
        this.selectedLanguages.push(languageId)
      } else {
        this.selectedLanguages = this.selectedLanguages.filter(
          (id) => id !== languageId
        )
      }
    },

    handleExportBtnClick() {}
  }
}
</script>

<style lang="scss" scoped>
.export-keys-modal {
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  &__section-title {
    margin-top: 0;
    margin-bottom: 16px;
  }

  &__formats,
  &__languages {
    width: 558px;
  }

  &__languages {
    &-all {
      display: block;
      margin-bottom: 12px;
    }
  }

  &__formats {
    /deep/ .el-radio {
      margin-bottom: 8px;
    }
  }
}

.languages {
  &__item {
    margin-bottom: 8px;

    /deep/.el-checkbox {
      display: flex;
      align-items: center;

      &__label {
        display: flex;
        align-items: center;
      }
    }
  }

  &__img,
  &__name {
    margin-right: 8px;
  }
}
</style>
