function localizationCtrl($translate) {
    'ngInject';

    let ctrl = this;
    ctrl.language = 'en';
    ctrl.languages = ['en', 'ru'];

    ctrl.updateLanguage = function() {
        $translate.use(ctrl.language)
    }
}


export default localizationCtrl;