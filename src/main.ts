/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>

import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';

import 'materialize-css';
import '!style-loader!css-loader!materialize-css/dist/css/materialize.css';

import '!style-loader!css-loader!./styles/global.css';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-materialize-bridge'), b => b.useAll());

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
