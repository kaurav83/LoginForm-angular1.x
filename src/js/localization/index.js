import angular from 'angular';

let localizationModule = angular.module('app.localization', ['pascalprecht.translate']);

import localizationConfig from './localization.config';
localizationModule.config(localizationConfig);

import localizationCtrl from './localization.controller';
localizationModule.controller('localizationCtrl', localizationCtrl);

export default localizationModule;

