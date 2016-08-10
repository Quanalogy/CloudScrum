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
describe("The user read all route", () => {
    // Drop the database before each test.
    beforeEach((done) => {
        dropDatabase().catch((err) => {
            console.log(err);
        }).then(() => {
            done();
        });
    });

    it("returns no users when none are present.", (done) => {
        // Perform the get.
        sap(app)
            .get("/users/")
            .then((res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");

                assert.isDefined(res.body);
                assert.typeOf(res.body, "Array");
                assert.equal(res.body.length, 0);

                done();
            }).catch((err) => {
            done(err);
        });
    });

    it("returns all users when multiple are present.", (done) => {
        createUser(validEmail1, validPassword).then(() => {
            return createUser(validEmail2, validPassword);
        }).then(() => {
            return createUser(validEmail3, validPassword);
        }).then(() => {
            // Perform the get.
            sap(app)
                .get("/users/")
                .then((res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, "application/json");

                    assert.isDefined(res.body);
                    assert.typeOf(res.body, "Array");
                    assert.equal(res.body.length, 3);

                    // TODO: Check user 1.
                    // TODO: Check user 2.
                    // TODO: Check user 3.

                    done();
                }).catch((err) => {
                done(err);
            });
        });
    });
});
