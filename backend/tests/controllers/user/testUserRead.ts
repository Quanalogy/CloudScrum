import { assert } from "chai";

import { connect, dropDatabase } from "../../../config/mongodb";

import {Users, IUserDocument} from "../../../models/UserModel";

import {getUser} from "../../../controllers/user/userControllerRead";
import {createUser} from "../../../controllers/user/userControllerCreate";

before((done) => {
    connect().then(() => {
        done();
    });
});

describe("The user controller", function() {
    beforeEach((done) => {
        dropDatabase().catch((err) => {
            console.log(err);
        }).then(() => {
            done();
        });
    });

    it("can read 0 users in an empty database.", function(done) {
        Users.count({}).exec().then( (numberOfUsers) => {
            assert.equal(numberOfUsers, 0);
        }).then( () => {
            done();
        });
    });

    it("can read 1 users in a populated database.", function(done) {
        // Define test data.
        const userEmail = "a@valid.email.com";
        const userPassword = "testT1!s";

        Users.count({}).exec().then( (numberOfUsers) => {
            assert.equal(numberOfUsers, 0);
        }).then( () => {
            return createUser(userEmail, userPassword);
        }).then( () => {
            // Check that there are 1 element in the database.
            return Users.count({}).exec();
        }).then( (numberOfUsers) => {
            assert.equal(numberOfUsers, 1);
        }).then( () => {
            // Check that we can get the user via the interface.
            return getUser(userEmail);
        }).then( (user: IUserDocument) => {
            assert.isDefined(user);
            assert.equal(user.email, userEmail);
            assert.isTrue(user.checkPassword(userPassword));
        }).then( () => {
            done();
        });
    });
});
