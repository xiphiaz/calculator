namespace common.services {

    export const namespace = 'common.services';

    angular.module(namespace, [
        namespace + '.error',
        namespace + '.profile',
    ]);

}

