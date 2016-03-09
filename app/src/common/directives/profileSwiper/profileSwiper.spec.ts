namespace common.directives.profileSwiper {

    interface TestScope extends ng.IRootScopeService {
        users: common.models.User[];
        ProfileSwiperController: ProfileSwiperController;
    }

    describe('Profile Swiper directive', () => {

        let $compile:ng.ICompileService,
            $rootScope:ng.IRootScopeService,
            directiveScope:TestScope,
            compiledElement:ng.IAugmentedJQuery,
            directiveController:ProfileSwiperController,
            $q:ng.IQService
        ;

        beforeEach(()=> {

            module('app');

            inject((_$compile_, _$rootScope_, _$q_) => {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $q = _$q_;
            });

            //only initialise the directive once to speed up the testing
            if (!directiveController) {

                directiveScope = <TestScope>$rootScope.$new();

                compiledElement = $compile(`
                    <profile-swiper
                        ng-model="users">
                    </profile-swiper>
                `)(directiveScope);

                $rootScope.$digest();

                directiveController = (<TestScope>compiledElement.isolateScope()).ProfileSwiperController;

            }

        });

        it('should initialise the directive', () => {

            expect($(compiledElement).hasClass('ng-untouched')).to.be.true;
        });


    });

}