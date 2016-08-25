import sap = require("supertest-as-promised");

import {app} from "../../app";
import {connect, dropDatabase} from "../../config/mongodb";
import {Response} from "supertest-as-promised";

import {JSONUser} from "../../models/json/JSONUser";
import {createUser} from "../../controllers/user/userControllerCreate";
import {JSONOk} from "../../models/json/JSONOk";

beforeAll((done) => {
    // Connect to the database.
    connect().then(done);
});

describe("The /users route", () => {
    beforeAll((done) => {
        this.testData = {
            email1: "this@is.valid.com",
            email2: "this@is.also.valid.com",
            password1: "abcdeF1!",
            password2: "abcdeF2!"
        };

        done();
    });

    it("has the expected routes and no more.");

    it("has authentication on the expected routes.");

    describe("get /", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("returns an empty array of users if none are present.");

        it("returns an array of users if one is present.");

        it("returns an array of users if more are present.");
    });

    describe("get /:email", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("returns a single user if one is present.", (done) => {
            // Inject a user.
            let user;

            createUser(this.testData.email1, this.testData.password1).then((u) => {
                user = u;

                return sap(app).get("/users/" + this.testData.email1);
            }).then((res: Response) => {
                // Check the response data.
                expect(res.status).toBe(200);
                expect(res.type).toBe("application/json");
                expect(res.body).toBeDefined();

                // Get all the keys.
                const keys = Object.keys(new JSONUser());

                for(const key of keys) {
                    expect(res.body[key]).toBeDefined("Could not get the property: " + key + ".");
                    expect(res.body[key]).toBe(user[key], "Data did not match for: " + key + ".");
                }

                // There should not be any other keys.
                for(const key in res.body) {
                    expect(keys.indexOf(key)).toBeGreaterThan(-1, "Found extra property on the response: " + key + ".");
                }

                done();
            });
        });

        it("returns no user if none are present.", (done) => {
            const request = sap(app).get("/users/" + this.testData.email1).then((res: Response) => {
                // Check the response data.
                expect(res.status).toBe(200);
                expect(res.type).toBe("application/json");
                expect(res.body).toBeDefined();

                // Make sure we have the correct error key.
                expect(res.body.ok).toBeDefined();
                expect(res.body.ok).toBeFalsy();

                expect(res.body.errors).toBeDefined();
                expect(res.body.errors.length).toBe(1);

                // There should not be any other keys.
                for(const key in res.body) {
                    expect((["ok", "errors"].indexOf(key))).toBeGreaterThan(-1, "Found extra property on the response: " + key + ".");
                }

                done();
            });
        });
    });

    describe("patch /", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("can handle malformed data.");

        it("can patch a single parameter on the specified user.");

        it("can patch multiple parameters on the specified user.");

        it("cannot patch a non-existing user.");
    });

    describe("post /", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("can handle malformed data.");

        it("can create a user.");
    });

    describe("post /login", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("can handle malformed data.");

        it("can authenticate an existing user with the right credentials.");

        it("cannot authenticate an existing user with the wrong credentials.");

        it("cannot authenticate a non-existing user.");
    });

    describe("put /", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("can handle malformed data.");
    });

    describe("delete /", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("can handle malformed data.");
    });
});
