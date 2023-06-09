const ru = {
  translation: {
    login: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      noAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
      submit: 'Войти',
      validation: {
        invalidLogin: 'Неверные имя пользователя или пароль',
      },
    },
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      validation: {
        minmax: 'От 3 до 20 символов',
        required: 'Обязательное поле',
        min: 'Не менее 6 символов',
        confirmation: 'Пароли должны совпадать',
        uniqueError: 'Такой пользователь уже существует',
      },
    },
    navbar: {
      title: 'Hexlet Chat',
      logout: 'Выйти',
    },
    notFound: {
      title: 'Страница не найдена',
      redirect: 'Но вы можете перейти',
      mainPage: 'на главную страницу',
    },
    channels: {
      channelsHeader: 'Каналы',
      removeBtn: 'Удалить',
      renameBtn: 'Переименовать',
      control: 'Управление каналом',
    },
    messages: {
      amount: {
        message_one: '{{count}} сообщение',
        message_few: '{{count}} сообщения',
        message_many: '{{count}} сообщений',
      },
      form: {
        placeholder: 'Введите сообщение...',
        aria: 'Новое сообщение',
        submit: 'Отправить',
      },
    },
    newChannelModal: {
      title: 'Добавить канал',
      name: 'Имя канала',
      cancelBtn: 'Отменить',
      confirmBtn: 'Отправить',
      validation: {
        minmax: 'От 3 до 20 символов',
        required: 'Обязательное поле',
        uniqueError: 'Должно быть уникальным',
      },
    },
    renameChannelModal: {
      title: 'Переименовать канал',
      name: 'Имя канала',
      cancelBtn: 'Отменить',
      confirmBtn: 'Отправить',
      validation: {
        minmax: 'От 3 до 20 символов',
        required: 'Обязательное поле',
        uniqueError: 'Должно быть уникальным',
      },
    },
    removeChannelModal: {
      title: 'Удалить канал',
      confirm: 'Уверены?',
      cancelBtn: 'Отменить',
      confirmBtn: 'Удалить',
    },
    toast: {
      newChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
    },
    errors: {
      network: 'Ошибка соединения',
    },
    spinner: {
      loading: 'Loading...',
    },
  },
};

export default ru;
