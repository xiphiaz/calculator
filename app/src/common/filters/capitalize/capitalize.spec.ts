namespace common.filters.capitalize {

    describe('Capitalize filter', function () {
        let $filter:ng.IFilterService;

        beforeEach(function () {
            module('app');

            inject(function (_$filter_) {
                $filter = _$filter_;
            });
        });

        it('should capitalize correctly', function () {

            expect($filter('capitalize')('hello')).to.equal('Hello');

            expect($filter('capitalize')('hello how are you')).to.equal('Hello how are you');

        });
    });

}