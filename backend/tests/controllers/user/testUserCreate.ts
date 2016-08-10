import { assert } from "chai";

import { connect, dropDatabase } from "../../../config/mongodb";

import {Users} from "../../../models/UserModel";

import {createUser} from "../../../controllers/user/userControllerCreate";

before((done) => {
    connect().then(() => {
        done();
    });
});

// Define test data.
const userEmail = "a@valid.email.com";
const userEmailInvalid = "a.valid.email.com";
const userEmailUppercase = "A@valid.email.com";
const userPassword = "testT1!s";
const userPasswordInvalid = "testT1ss";

describe("The user controller", function() {
    beforeEach((done) => {
        dropDatabase().catch((err) => {
            console.log(err);
        }).then(() => {
            done();
        });
    });

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
        createUser(userEmail, userPassword).then(() => { // this should be ok - empty database
            return createUser(userEmailUppercase, userPassword);
        }, () => {    // Database error
            done(new Error("Is the database running? Cannot create user!"));
        }).then(() => {    // Damn we can create an user with the same email!!
            done(new Error("Could create the user with the same uppercase email!!"));
        }, () => {     // Good the request was rejected
            done();
        });
    });

    it("cannot create a user with an existing email", (done) => {
        createUser(userEmail, userPassword).then(() => {
            return createUser(userEmail, userPassword);
        }, () => {
            done(new Error("Unspecified database error."));
        }).then(() => {
            done(new Error("Could create the user with the same mail."));
        }, () => {
            done();
        });
    });

    it("cannot create a user with an empty email", (done) => {
        createUser("", userPassword).then((fulfilled) => {
            done(new Error("Can create a new user with an empty email."));
        }, (rejected) => {
            done();
        });
    });

    it("cannot create a user with an invalid email", (done) => {
        createUser(userEmailInvalid, userPassword).then((fulfilled) => {
            done(new Error("Can create a new user with an empty email."));
        }, (rejected) => {
            done();
        });
    });

    it("cannot create a user with an empty password", (done) => {
        createUser(userEmail, "").then((fulfilled) => {
            done(new Error("Can create a new user with an empty password."));
        }, (rejected) => {
            done();
        });
    });

    it("cannot create a user with an invalid password", (done) => {
        createUser(userEmail, userPasswordInvalid).then((fulfilled) => {
            done(new Error("Can create a new user with an invalid password."));
        }, (rejected) => {
            done();
        });
    });
});
