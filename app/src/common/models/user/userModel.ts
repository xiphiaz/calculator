namespace common.models {

    export class User extends AbstractModel {

        protected __nestedEntityMap:INestedEntityMap = {
        };

        protected __attributeCastMap:IAttributeCastMap = {
            createdAt: this.castMoment,
            updatedAt: this.castMoment,
        };

        protected __primaryKey = 'userId';

        public userId:string;
        public email:string;
        public firstName:string;
        public lastName:string;


        /**
         * Getter for the user's full name
         * @returns {string}
         */
        get fullName():string {
            return _.filter([this.firstName, this.lastName], _.identity).join(' ');
        }

    }

}



