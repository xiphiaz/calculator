///<reference path="../../src/global.d.ts" />

let expect:Chai.ExpectStatic = chai.expect;

describe('Bootstrap', () => {

    describe('App Controller', () => {

        let AppCtrl, $state;

        beforeEach(() => {

            module('app');
        });

        beforeEach(()=> {
            inject(($controller, _$mdSidenav_, _$state_) => {

                $state = _$state_;

                AppCtrl = $controller('app.controller', {
                    $mdSidenav: _$mdSidenav_,
                    $state: $state
                });
            })
        });

        it('should pass a dummy test', () => {

            expect(AppCtrl).to.be.ok;
        });

    });

});