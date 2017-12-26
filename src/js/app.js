import angular from 'angular';

import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';
import 'angular-ui-router';
import 'angular-translate';
import 'angular-sanitize';

import './config/app.templates';

import './layout';
import './components';
import './home';
import './profile';
import './services';
import './auth';
import './localization';

const requires = [
  'ngSanitize',
  'ui.router',
  'templates',
  'app.layout',
  'app.components',
  'app.home',
  'app.profile',
  'app.services',
  'app.auth',
  'pascalprecht.translate',
  'app.localization'
];

window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
