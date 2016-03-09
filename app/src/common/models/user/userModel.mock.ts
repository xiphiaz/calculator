namespace common.models {

    export class UserMock extends AbstractMock implements IMock {

        public getModelClass():IModelClass {
            return User;
        }

        public getMockData():Object {

            let seededChance = new Chance();

            return {
                userId: seededChance.guid(),
                email: seededChance.email(),
                firstName: seededChance.first(),
                lastName: seededChance.last(),
            };

        }

        public static entity(overrides:Object = {}, exists:boolean = true):User {
            return <User> new this().buildEntity(overrides, exists);
        }

        public static collection(count:number = 10, overrides:Object = {}, exists:boolean = true):User[] {
            return <User[]>new this().buildCollection(count, overrides, exists);
        }

    }

}