namespace common.directives.calculator {

    export const namespace = 'common.directives.calculator';

    export interface IEntityChangedHandler {
        (value:number):void;
    }

    export class CalculatorController {

        private valueChangedHandler:IEntityChangedHandler;

        public inputRegister:(string|number)[] = [];

        public keys = [
            [1, 2, 3, '+'],
            [4, 5, 6, '-'],
            [7, 8, 9, 'x'],
            ['.', 0, '=', '÷'],
        ];

        private operators:string[] = ['+','-','x','÷'];

        static $inject = [];
        constructor() {

        }

        /**
         * Clear the input register
         */
        public reset(){
            this.inputRegister = [];
        }

        /**
         * Handle key input
         * @param key
         */
        public handleKey(key:string|number):void {
            if (key == '='){ //result requested, calculate immediately
                this.calculate();
            } else if (_.intersection(this.operators, this.inputRegister).length > 0 && this.isOperator(key)){ //second operator requested, calculate and push in operator
                this.calculate();
                this.inputRegister.push(key);
            } else { //just a number or decimal, push it in
                this.inputRegister.push(key);
            }
        }

        /**
         * Check if an input element is an operator
         * @param input
         * @returns {boolean}
         */
        private isOperator(input:number|string):boolean {
            return _.contains(this.operators, input);
        }

        /**
         * Run the calculation
         * 1. Extract the left, right, operator from input array
         * 2. Coerce the left and right input arrays to numbers
         * 3. Find the operator
         * 4. Make the calculation
         * 5. Clear the input register
         * 6. Report new model value back to ngModel controller
         * 7. Push in the result for running calculations
         */
        private calculate():void {
            let result:number = null;

            let leftSide:(string|number)[] = (<any>_).takeWhile(this.inputRegister, (input) => !this.isOperator(input));
            let rightSide:(string|number)[] = (<any>_).takeRightWhile(this.inputRegister, (input) => !this.isOperator(input));
            let leftNum:number = this.coerceNumber(leftSide);
            let rightNum:number = this.coerceNumber(rightSide);
            let operator:string = <string>_.find(this.inputRegister, (input) => this.isOperator(input));

            switch (operator) {
                case '+':
                    result = leftNum + rightNum;
                    break;
                case '-':
                    result = leftNum - rightNum;
                    break;
                case 'x':
                    result = leftNum * rightNum;
                    break;
                case '÷':
                    result = leftNum / rightNum;
                    break;
            }

            this.reset();

            this.valueChangedHandler(result);
            this.inputRegister.push(result);
        }

        /**
         * Register the change handler so the controller can communicate with the ngModel controller
         * @param handler
         */
        public registerValueChangedHandler(handler:IEntityChangedHandler):void {
            this.valueChangedHandler = handler;
        }

        /**
         * Coerce the input array of values to be a number by joining them and casting to number
         * @param input
         * @returns {Number}
         */
        private coerceNumber(input:(string|number)[]):number{
            return Number(input.join(''));
        }
    }

    class CalculatorDirective implements ng.IDirective {

        public restrict = 'E';
        public require = ['ngModel', 'calculator'];
        public templateUrl = 'templates/common/directives/calculator/calculator.tpl.html';
        public replace = false;
        public scope = {};

        public controllerAs = 'CalculatorController';
        public controller = CalculatorController;
        public bindToController = true;

        constructor() {
        }

        public link = ($scope:ng.IScope, $element:ng.IAugmentedJQuery, $attrs:ng.IAttributes, $controllers:[ng.INgModelController, CalculatorController]) => {

            let $ngModelController = $controllers[0];
            let directiveController = $controllers[1];

            //On change detected, set the element to dirty & touched so the parent controller can detect change
            directiveController.registerValueChangedHandler((value:number) => {
                $ngModelController.$setDirty();
                $ngModelController.$setTouched();
                $ngModelController.$setViewValue(value);
            });

        };

        static factory():ng.IDirectiveFactory {
            const directive = () => new CalculatorDirective();
            return directive;
        }
    }

    angular.module(namespace, [])
        .directive('calculator', CalculatorDirective.factory())
    ;

}