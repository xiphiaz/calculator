namespace common.services.profile {

    describe('Profile Service', () => {

        let profileService:ProfileService;

        beforeEach(()=> {

            module('app');

            inject((_profileService_) => {

                if (!profileService) { //dont rebind, so each test gets the singleton
                    profileService = _profileService_;
                }
            });

        });

        afterEach(() => {
        });

        describe('Initialisation', () => {

            it('should be an injectable service', () => {

                return expect(profileService).to.be.an('object');
            });

        });

        //@todo write tests


    });

}