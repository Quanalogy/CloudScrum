// Set the environment to "test".
import {createUser} from "../../../controllers/user/userControllerCreate";
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
const validEmail1 = "this@is.valid.com";
const validEmail2 = "this@is.valid.com";
const validEmail3 = "this@is.valid.com";
const validPassword = "testT1!d";

// Test the user route API.
describe("The user read single route", () => {
    // Drop the database before each test.
    beforeEach((done) => {
        dropDatabase().catch((err) => {
            console.log(err);
        }).then(() => {
            done();
        });
    });

    it("can get all properties of an existing user when a single user is present.", (done) => {
        // Inject the required user.
        createUser(validEmail1, validPassword).then(() => {
            // Perform the get.
            sap(app)
                .get("/users/" + validEmail1)
                .then((res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, "application/json");

                    assert.isDefined(res.body);
                    assert.isDefined(res.body.email);
                    assert.equal(res.body.email, validEmail1);

                    done();
                }).catch((err) => {
                done(err);
            });
        });
    });

    it("can get all properties of an existing user when a multiple users are present.", (done) => {
        createUser(validEmail1, validPassword).then(() => {
            return createUser(validEmail2, validPassword);
        }).then(() => {
            return createUser(validEmail3, validPassword);
        }).then(() => {
            // Perform the get.
            sap(app)
                .get("/users/" + validEmail1)
                .then((res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, "application/json");

                    assert.isDefined(res.body);
                    assert.isDefined(res.body.email);
                    assert.equal(res.body.email, validEmail1);

                    done();
                }).catch((err) => {
                done(err);
            });
        });
    });

    it("returns no user when none are present.", (done) => {
        // Perform the get.
        sap(app)
            .get("/users/" + validEmail1)
            .then((res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");

                assert.isDefined(res.body);
                assert.isDefined(res.body.email);
                assert.equal(res.body.email, "");

                done();
            }).catch((err) => {
            done(err);
        });
    });
});
