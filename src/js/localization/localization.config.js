function localizationConfig($translateProvider) {
    'ngInject';
    $translateProvider.translations('en', {
        HELLO: 'Hello',
        haveAccount: 'Go to the authorization page',
        needAccount: 'Go to the registration page',
        button: 'Submit',
        FeelForm: 'Fill in form',
        home: 'Home',
        logout: 'Logout',
        mainTitle: 'Home Page',
        signIn: 'Sign in',
        signUp: 'Sign up',
        profileTitle: 'It is a page of',
        en: 'en',
        ru: 'ru'
    });
    $translateProvider.translations('ru', {
        HELLO: 'Привет',
        haveAccount: 'Перейти на страницу авторизации',
        needAccount: 'Перейти на страницу регистрации',
        button: 'Отправить',
        FeelForm: 'Заполните форму',
        home: 'Главная',
        logout: 'Выйти',
        mainTitle: 'Главная страница',
        signIn: 'Войти',
        signUp: 'Регистрация',
        profileTitle: 'Это страница пользователя',
        en: 'en',
        ru: 'ru'
    });
    $translateProvider.preferredLanguage("en");
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
}

export default localizationConfig;