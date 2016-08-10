import mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

import * as config from "../../../config/mongodb";

import {Users} from "../../../models/UserModel";

import {createUser} from "../../../controllers/user/userControllerCreate";

beforeEach((done) => {
    config.connect().then(done);
});

describe("", function() {
    beforeEach( (done) => {
        // Drop the entire database.
        mongoose.connection.db.dropDatabase(done);
    });

    it("Can create a user in an empty database.", function(done) {
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
            done();
        });
    });
});
