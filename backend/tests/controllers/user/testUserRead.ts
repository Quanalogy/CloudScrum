import mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

import * as config from "../../../config/mongodb";

import {Users, IUserDocument} from "../../../models/UserModel";

import {getUser} from "../../../controllers/user/userControllerRead";
import {createUser} from "../../../controllers/user/userControllerCreate";

beforeEach((done) => {
    config.connect().then(done);
});

describe("", function() {
    beforeEach( (done) => {
        // Drop the entire database.
        mongoose.connection.db.dropDatabase(done);
    });

    it("Can read 0 users in an empty database.", function(done) {
        Users.count({}).exec().then( (numberOfUsers) => {
            expect(numberOfUsers).toBe(0);
        }).then( () => {
            done();
        });
    });

    it("Can read 1 users in a populated database.", function(done) {
        // Define test data.
        const userEmail = "a@valid.email.com";
        const userPassword = "testT1!s";

        Users.count({}).exec().then( (numberOfUsers) => {
            expect(numberOfUsers).toBe(0);
        }).then( () => {
            return createUser(userEmail, userPassword);
        }).then( () => {
            // Check that there are 1 element in the database.
            return Users.count({}).exec();
        }).then( (numberOfUsers) => {
            expect(numberOfUsers).toBe(1);
        }).then( () => {
            // Check that we can get the user via the interface.
            return getUser(userEmail);
        }).then( (user: IUserDocument) => {
            expect(user).toBeDefined();
            expect(user.email).toBe(userEmail);
            expect(user.checkPassword(userPassword)).toBe(true);
        }).then( () => {
            done();
        });
    });
});
