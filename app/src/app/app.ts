namespace app {

    export const namespace = 'app';
    const DATEPICKER_FORMAT = 'DD/MM/YYYY';

    class AppConfig {

        static $inject = ['$provide'];

        constructor($provide:ng.auto.IProvideService) {

            $provide.constant('$MD_THEME_CSS', '/**/'); //disable all angular material style injections
        }

    }

    class AppInit {

        static $inject = ['$rootScope'];

        constructor(private $rootScope:ng.IRootScopeService) {

            moment.locale('en-gb');
            $rootScope.$on('$stateChangeError', _.bind(console.error, console));

        }

    }

    export class AppController {

        static $inject = ['$mdSidenav', '$state'];

        constructor() {
        }


    }

    angular.module(namespace, [
            'templates',
            'config.vendorModules',
            'config.commonModules',
            'config.stateManager',
            'app.root'
        ])
        .config(AppConfig)
        .run(AppInit)
        .controller(namespace + '.controller', AppController);

}