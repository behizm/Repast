/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/semantic-ui/index.d.ts"/>

import 'isomorphic-fetch';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

import '../node_modules/semantic-ui/dist/semantic.js'; // semantic-ui

export function configure(aurelia: Aurelia) {
    aurelia.use.standardConfiguration().plugin(PLATFORM.moduleName('aurelia-validation'));

    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    new HttpClient().configure(config => {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        config.withBaseUrl(baseUrl);
    });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app/app')));
}
