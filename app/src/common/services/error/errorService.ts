namespace common.services.error {

    export const namespace = 'common.services.error';

    export class ErrorService {

        static $inject:string[] = ['$timeout', '$mdDialog'];

        constructor(private $timeout:ng.ITimeoutService,
                    private $mdDialog:ng.material.IDialogService) {

        }

        public showError(title:string, message:string, extra?:any, $event:MouseEvent = null):ng.IPromise<boolean> {

            let dialogConfig:ng.material.IDialogOptions = {
                templateUrl: 'templates/common/services/error/errorDialog.tpl.html',
                controller: 'common.services.error.controller',
                controllerAs: 'ErrorDialogController',
                clickOutsideToClose: true,
                locals: {
                    title: title,
                    message: message,
                    extra: extra,
                },
                targetEvent: $event
            };

            return this.$timeout(_.noop) //first do an empty timeout to allow the controllers to init if login prompt is fired from within a .run() phase
                .then(() => this.$mdDialog.show(dialogConfig));

        }

    }

    export class ErrorDialogController {

        static $inject:string[] = ['$mdDialog', 'title', 'message', 'extra'];

        constructor(private $mdDialog:ng.material.IDialogService,
                    private title:string,
                    private message:string,
                    private extra:any) {
        }

        /**
         * allow the user to manually close the dialog
         */
        public cancelErrorDialog() {
            this.$mdDialog.cancel('dismissed');
        }

    }

    angular.module(namespace, [])
        .service('errorService', ErrorService)
        .controller(namespace + '.controller', ErrorDialogController);

}



