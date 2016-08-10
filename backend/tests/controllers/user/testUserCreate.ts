import { assert } from "chai";

import { connect, dropDatabase } from "../../../config/mongodb";

import {Users} from "../../../models/UserModel";

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

    // Define test data.
    const userEmail = "a@valid.email.com";
    const userEmailUppercase = "A@valid.email.com";
    const userPassword = "testT1!s";

    it("can create a user in an empty database.", function(done) {

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
            done();
        });
    });

    it("can not differentiate between upper- and lowercase email", (done) => {
        createUser(userEmail, userPassword).then(fullfilled => { // this should be ok - empty database
            return createUser(userEmailUppercase, userPassword);
        }, rejected => {    // Database error
            done(new Error("Is the database running? Cannot create user!"));
        }).then(success => {    // Damn we can create an user with the same email!!
            done(new Error("Could create the user with the same uppercase email!!"));
        }, failure => {     // Good the request was rejected
            done();
        });

    });
});
