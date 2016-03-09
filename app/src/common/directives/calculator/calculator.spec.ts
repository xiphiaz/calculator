namespace common.directives.calculator {

    interface TestScope extends ng.IRootScopeService {
        result: number;
        CalculatorController: CalculatorController;
    }

    describe.only('Calculator directive', () => {

        let $compile:ng.ICompileService,
            $rootScope:ng.IRootScopeService,
            directiveScope:TestScope,
            compiledElement:ng.IAugmentedJQuery,
            directiveController:CalculatorController,
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
                    <calculator
                        ng-model="result">
                    </calculator>
                `)(directiveScope);

                $rootScope.$digest();

                directiveController = (<TestScope>compiledElement.isolateScope()).CalculatorController;

            }

        });

        it('should initialise the directive', () => {

            expect($(compiledElement).hasClass('ng-untouched')).to.be.true;
        });

        it('should store a register of inputs', () => {

            directiveController.handleKey(1);
            directiveController.handleKey(2);
            directiveController.handleKey(3);

            expect((<any>directiveController).inputRegister).to.have.length(3);
            expect((<any>directiveController).inputRegister).to.deep.equal([1,2,3]);

        });

        it('should be able to clear the register', () => {

            expect((<any>directiveController).inputRegister).to.have.length.greaterThan(0);
            directiveController.reset();
            expect((<any>directiveController).inputRegister).to.have.length(0);

        });

        it('should request calculation of the result when equals is called', () => {

            let spy = sinon.spy(directiveController, 'calculate');

            directiveController.handleKey(1);
            directiveController.handleKey('+');
            directiveController.handleKey(1);
            directiveController.handleKey('=');

            expect(spy).to.have.been.calledOnce;

            spy.restore();

        });

        it('should request calculation of the result when a second operator is called', () => {

            let spy = sinon.spy(directiveController, 'calculate');

            directiveController.reset();

            directiveController.handleKey(1);
            directiveController.handleKey('+');
            directiveController.handleKey(1);
            directiveController.handleKey('x');

            expect(spy).to.have.been.calledOnce;

            spy.restore();

        });

        it('should be able to calculate 1+1=2', () => {

            directiveController.reset();

            directiveController.handleKey(1);
            directiveController.handleKey('+');
            directiveController.handleKey(1);
            directiveController.handleKey('=');

            expect(directiveScope.result).to.equal(2);

        });

        it('should be able to calculate 10/5=2', () => {

            directiveController.reset();

            directiveController.handleKey(10);
            directiveController.handleKey('÷');
            directiveController.handleKey(5);
            directiveController.handleKey('=');

            expect(directiveScope.result).to.equal(2);

        });

        it('should be able to calculate 10-5=5', () => {

            directiveController.reset();

            directiveController.handleKey(10);
            directiveController.handleKey('-');
            directiveController.handleKey(5);
            directiveController.handleKey('=');

            expect(directiveScope.result).to.equal(5);

        });

        it('should be able to calculate 10x5=50', () => {

            directiveController.reset();

            directiveController.handleKey(10);
            directiveController.handleKey('x');
            directiveController.handleKey(5);
            directiveController.handleKey('=');

            expect(directiveScope.result).to.equal(50);

        });

        it('should be able to make a running calculation', () => {

            directiveController.reset();

            directiveController.handleKey(10);
            directiveController.handleKey('x');
            directiveController.handleKey(5);
            directiveController.handleKey('+');
            directiveController.handleKey(5);
            directiveController.handleKey('÷');
            directiveController.handleKey(11);
            directiveController.handleKey('-');
            directiveController.handleKey(2);
            directiveController.handleKey('=');

            expect(directiveScope.result).to.equal(3);

        });


    });

}