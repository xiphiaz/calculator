namespace common.services.profile {

    export const namespace = 'common.services.profile';

    export class ProfileService {

        constructor() {
        }

        public getProfiles(){
            //@todo
        }


    }

    angular.module(namespace, [])
        .service('profileService', ProfileService);

}



