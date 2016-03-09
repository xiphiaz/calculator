namespace app.root {

    export const namespace = 'app.root';

    export class RootController {

        static $inject = ['$state'];

        constructor(public $state:ng.ui.IStateService) {
        }

    }

    angular.module(namespace, [])
        .controller(namespace + '.controller', RootController);

}