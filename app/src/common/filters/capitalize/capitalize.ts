namespace common.filters.capitalize {

    export const namespace = 'common.filters.capitalize';

    export function CapitalizeFilter() {

        return function capitalize(text:string) {

            return (!!text) ? text.charAt(0).toUpperCase() + text.substr(1) : '';

        }
    }

    angular.module(namespace, [])
        .filter('capitalize', CapitalizeFilter)
    ;

}