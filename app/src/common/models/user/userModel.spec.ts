namespace common.models {

    describe('User Model', () => {

        let userData:any = new UserMock().getMockData();

        it('should instantiate a new user', () => {

            let user = new User(_.clone(userData, true)); // We have to clone the user data so that we get a fresh copy for each test

            expect(user).to.be.instanceOf(User);

        });

        it('should get custom user mock entity', () => {

            let user = UserMock.entity({userId: 'abc-123'});

            expect(user).to.be.instanceOf(User);

            expect(user.userId).to.equal('abc-123');

        });

        it('should get user mock collection', () => {

            let users = UserMock.collection(5);

            expect(users).to.be.instanceOf(Array);

            expect(users).to.have.length(5);
        });

        it('should return the user\'s full name', () => {

            let user = new User(_.clone(userData, true));

            expect(user.fullName).to.equal(userData.firstName + ' ' + userData.lastName);

        });

        it('should return part of the user\'s full name if they don\'t have a part of their name', () => {

            let user = new User(_.clone(userData, true));

            user.lastName = undefined;

            expect(user.fullName).to.equal(userData.firstName);

        });

    });

}