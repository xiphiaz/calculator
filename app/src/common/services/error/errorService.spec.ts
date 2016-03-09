namespace common.services.error {

    let errorService:ErrorService,
        $q:ng.IQService,
        $timeout:ng.ITimeoutService,
        $mdDialog:ng.material.IDialogService,
        $httpBackend:ng.IHttpBackendService,
        $rootScope:ng.IRootScopeService,
        ErrorDialogController:ErrorDialogController;

    describe('Error Service', () => {

        beforeEach(()=> {

            module('app');

            inject((_$rootScope_, $controller, _$httpBackend_, _$q_, _$timeout_, _$mdDialog_, _errorService_) => {

                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                errorService = _errorService_;
                $q = _$q_;
                $timeout = _$timeout_;
                $mdDialog = _$mdDialog_;

                ErrorDialogController = $controller(common.services.error.namespace + '.controller', {
                    $mdDialog: $mdDialog,
                    title: "test title",
                    message: "test message",
                    extra: {
                        key: 'value'
                    },
                });

            });

        });

        it('should pop a dialog when requested', () => {

            sinon.spy($mdDialog, 'show');

            errorService.showError("Test title", "test message");

            $timeout.flush();

            expect($mdDialog.show).to.have.been.calledWithMatch({
                locals: {
                    title: "Test title",
                    message: "test message",
                }
            });

            (<Sinon.SinonSpy>$mdDialog.show).restore();

        });

        it('should be able to cancel the error dialog on creation', () => {

            sinon.spy($mdDialog, 'cancel');
            ErrorDialogController.cancelErrorDialog();

            expect($mdDialog.cancel).to.have.been.called;

            (<Sinon.SinonSpy>$mdDialog.cancel).restore();

        });

    });

}