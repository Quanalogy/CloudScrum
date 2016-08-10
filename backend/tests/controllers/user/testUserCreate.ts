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

    // Define test data.
    const userEmail = "a@valid.email.com";
    const userEmailUppercase = "A@valid.email.com";
    const userPassword = "testT1!s";

    it("Can create a user in an empty database.", function(done) {

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

    it("Can not differentiate between upper- and lowercase email", (done) => {
        createUser(userEmail, userPassword).then(fullfilled => { // this should be ok - empty database
            return createUser(userEmailUppercase, userPassword);
        }, rejected => {    // Database error
            fail("Is the database running? Cannot create user!");
            done();
        }).then(success => {    // Damn we can create an user with the same email!!
            fail("Could create the user with the same uppercase email!!");
            done();
        }, failure => {     // Good the request was rejected
            done();
        });

    });
});
