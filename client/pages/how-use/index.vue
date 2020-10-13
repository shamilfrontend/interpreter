<template>
  <div class="admin-page">
    <div class="container">
      <h1 class="admin-page__title">{{ $t('admin').howUse.title }}</h1>

      <el-collapse v-model="activeName" class="collapse" accordion>
        <el-collapse-item
          class="collapse__item"
          title="Создание проекта"
          name="1"
        >
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/FbKJz6pYmm4"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </el-collapse-item>

        <el-collapse-item class="collapse__item" title="Импорт ключей" name="2">
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/FbKJz6pYmm4"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </el-collapse-item>
        <el-collapse-item
          class="collapse__item"
          title="Экспорт ключей"
          name="3"
        >
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/FbKJz6pYmm4"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </el-collapse-item>
        <el-collapse-item
          class="collapse__item"
          title="Добавление участников"
          name="4"
        >
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/FbKJz6pYmm4"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'AdminHowUsePage',

  mixins: [mixinDefaultProps],

  data: () => ({
    activeName: ''
  })
}
</script>

<style lang="scss" scoped>
.collapse {
  border: none;

  &__item {
    margin-bottom: 16px;
  }
}
</style>
