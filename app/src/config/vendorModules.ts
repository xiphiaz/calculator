namespace config.vendorModules {

    export const namespace = 'config.vendorModules';

    angular.module(namespace, [
        'ngMessages', //nice validation messages
        'ngMaterial', //angular material
        'ui.router', // Handles state changes and routing of the site
        'ui.route', // Module to check for active urls, nothing to do with ui.router
        'ui.keypress', // Module to check for active urls, nothing to do with ui.router
        'ui.inflector', //Module to Humanise strings (camelCased or pipe-case etc)
        'ngAnimate', //angular animate
        'ngSanitize', //angular sanitise
    ]);

}
