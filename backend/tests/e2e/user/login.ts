// Set the environment to "test".
process.env.NODE_ENV = "test";

// We need to have more than the default 10 listeners.
require("events").EventEmitter.prototype._maxListeners = 100;

import { assert } from "chai";
import sap = require("supertest-as-promised");

import { app } from "../../../app";
import { connect, dropDatabase } from "../../../config/mongodb";

before((done) => {
    // Connect to the database.
    connect().catch((err) => {
        console.log(err);
    }).then(() => {
        done();
    });
});

// Define test data.
const validEmail = "this@is.valid.com";
const invalidEmail1 = "this.is.invalid.com";

const validPassword = "testT1!d";
const invalidPassword = "";

// Test the user route API.
describe("The user login route", () => {
    // Drop the database before each test.
    beforeEach((done) => {
        dropDatabase().catch((err) => {
            console.log(err);
        }).then(() => {
            done();
        });
    });

    it("can not authenticate with missing email.", (done) => {
        // Create the JSON object to send.
        const user = {
            password: validPassword
        };

        // Perform the post.
        sap(app)
            .post("/users/login")
            .send(user)
            .then((res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");

                assert.isDefined(res.body);
                assert.isDefined(res.body.ok);
                assert.isFalse(res.body.ok);

                done();
            }).catch((err) => {
            done(err);
        });
    });

    it("can not authenticate with missing password.", (done) => {
        // Create the JSON object to send.
        const user = {
            email: validEmail
        };

        // Perform the post.
        sap(app)
            .post("/users/login")
            .send(user)
            .then((res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");

                assert.isDefined(res.body);
                assert.isDefined(res.body.ok);
                assert.isFalse(res.body.ok);

                done();
            }).catch((err) => {
            done(err);
        });
    });

    it("can authenticate an existing user with valid data.", (done) => {
        // Create the JSON object to send.
        const user = {
            email: validEmail,
            password: validPassword
        };

        // Create the proper user.
        sap(app)
            .post("/users/")
            .send(user)
            .then((res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");

                // Perform the next call, to test authentication.
                return sap(app)
                    .post("/users/login")
                    .send(user);
            }).then((res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");

                assert.isDefined(res.body);
                assert.isDefined(res.body.ok);
                assert.isTrue(res.body.ok);
                assert.isDefined(res.body.token);

                done();
            }).catch((err) => {
                done(err);
            });
    });

    it("cannot authenticate an existing user with invalid data.", (done) => {
        // Create the JSON object to send.
        const user = {
            email: validEmail,
            password: validPassword
        };

        const userInvalid = {
            email: validEmail,
            password: invalidPassword
        };

        // Create the proper user.
        sap(app)
            .post("/users/")
            .send(user)
            .then((res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");

                // Perform the next call, to test authentication.
                return sap(app)
                    .post("/users/login")
                    .send(userInvalid);
            }).then((res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");

            assert.isDefined(res.body);
            assert.isDefined(res.body.ok);
            assert.isFalse(res.body.ok);

            done();
        }).catch((err) => {
            done(err);
        });
    });

    it("cannot authenticate a non-existing user.", (done) => {
        // Create the JSON object to send.
        const user = {
            email: validEmail,
            password: validPassword
        };

        // Create the proper user.
        sap(app)
            .post("/users/login")
            .send(user)
            .then((res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");

                assert.isDefined(res.body);
                assert.isDefined(res.body.ok);
                assert.isFalse(res.body.ok);

            done();
        }).catch((err) => {
            done(err);
        });
    });
});
