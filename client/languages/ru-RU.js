export default {
  admin: {
    header: {
      menu: [
        {
          link: '/projects',
          text: 'Проекты'
        },
        {
          link: '/how-use',
          text: 'Как использовать'
        },
        {
          link: '/support',
          text: 'Служба поддержки'
        }
      ],
      notifications: {
        title: 'Уведомления'
      },
      userMenu: {
        settings: 'Настройки',
        logout: 'Выход'
      }
    },
    projects: {
      createBtnName: 'Создать проект',
      projectItem: {
        projectDone: 'Выполнено на:',
        quantityKeys: 'Количество ключей:',
        wordsTranslated: 'Слов переведено:'
      }
    },
    howUse: {
      title: 'Как использовать'
    },
    support: {
      title: 'Служба поддержки'
    },
    settings: {
      title: 'Настройки',
      changePassword: {
        title: 'Смена пароля',
        current: 'Текущий пароль',
        new: 'Новый пароль',
        confirm: 'Повторите пароль',
        btnName: 'Изменить пароль'
      }
    }
  }
}
