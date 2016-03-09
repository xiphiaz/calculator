namespace app.guest {

    export const namespace = 'app.guest';

    class GuestConfig {

        static $inject = ['stateHelperServiceProvider'];

        constructor(private stateHelperServiceProvider) {

            let state:global.IState = {
                abstract: true,
                url: ``,
                params: {
                    region: {
                        value: null,
                        squash: true,
                    }
                },
                views: {
                    'app@': { // Points to the ui-view in the index.html
                        templateUrl: 'templates/app/_layouts/default.tpl.html',
                        controller: app.namespace + '.controller',
                        controllerAs: 'AppController',
                    },
                },
                data: {
                    loggedIn: false,
                    role: 'guest',
                }
            };

            stateHelperServiceProvider.addState(namespace, state);

        }

    }

    angular.module('app.guest', [
            'app.guest.home',
        ])
        .config(GuestConfig);

}