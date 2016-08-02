import mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

import * as config from "../../../config/mongodb";

import {Users} from "../../../models/UserModel";

beforeEach((done) => {
    config.connect();

    // Wait for the database to be open.
    mongoose.connection.once("open", done);
});

describe("", function() {
    beforeEach( (done) => {
        // Drop the entire database.
        mongoose.connection.db.dropDatabase(done);
    });

    it("Can create a user in an empty database.", function(done) {
        // Define test data.
        const userEmail = "a@valid.email.com";
        const userName = "testname with spaces";

        Users.count({}).exec().then( (numberOfUsers) => {
            expect(numberOfUsers).toBe(0);
        }).then( () => {
            // Create a new user.
            const user = new Users();

            // Assign id and name.
            user.email = userEmail;
            user.name = userName;

            return user.save();
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
