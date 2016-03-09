namespace common.directives.profileSwiper {

    export const namespace = 'common.directives.profileSwiper';


    export class ProfileSwiperController {

        static $inject = ['profileService'];

        constructor(private profileService:common.services.profile.ProfileService) {

        }


    }

    class ProfileSwiperDirective implements ng.IDirective {

        public restrict = 'E';
        public require = ['ngModel', 'profileSwiper'];
        public templateUrl = 'templates/common/directives/profileSwiper/profileSwiper.tpl.html';
        public replace = false;
        public scope = {};

        public controllerAs = 'ProfileSwiperController';
        public controller = ProfileSwiperController;
        public bindToController = true;

        constructor() {
        }

        public link = ($scope:ng.IScope, $element:ng.IAugmentedJQuery, $attrs:ng.IAttributes, $controllers:[ng.INgModelController, ProfileSwiperController]) => {

            let $ngModelController = $controllers[0];
            let directiveController = $controllers[1];

        };

        static factory():ng.IDirectiveFactory {
            const directive = () => new ProfileSwiperDirective();
            return directive;
        }
    }

    angular.module(namespace, [])
        .directive('profileSwiper', ProfileSwiperDirective.factory())
    ;

}