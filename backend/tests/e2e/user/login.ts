import sap = require("supertest-as-promised");

import {app} from "../../../app";
import {connect, dropDatabase} from "../../../config/mongodb";

beforeAll((done) => {
    // Connect to the database.
    connect().catch((err) => {
        console.log(err);
    }).then(done);
});

// Define test data.
const validEmail = "this@is.valid.com";
const invalidEmail1 = "this.is.invalid.com";

const validPassword = "test";
const invalidPassword = "";

// Test the user route API.
describe("The user login route", () => {
    // Drop the database before each test.
    beforeEach((done) => {
        dropDatabase().catch((err) => {
            console.log(err);
        }).then(done);
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
                expect(res.status).toBe(200);
                expect(res.type).toBe("application/json");

                expect(res.body).toBeDefined();
                expect(res.body.ok).toBeDefined();
                expect(res.body.ok).toBe(false);

                done();
            }).catch((err) => {
            done(err);
        });
    });

    it("can not authenticate with missing email.", (done) => {
        // Create the JSON object to send.
        const user = {
            email: validEmail
        };

        // Perform the post.
        sap(app)
            .post("/users/login")
            .send(user)
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.type).toBe("application/json");

                expect(res.body).toBeDefined();
                expect(res.body.ok).toBeDefined();
                expect(res.body.ok).toBe(false);

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
                expect(res.status).toBe(200);
                expect(res.type).toBe("application/json");

                // Perform the next call, to test authentication.
                return sap(app)
                    .post("/users/login")
                    .send(user);
            }).then((res) => {
                expect(res.status).toBe(200);
                expect(res.type).toBe("application/json");

                expect(res.body).toBeDefined();
                expect(res.body.ok).toBeDefined();
                expect(res.body.ok).toBe(true);
                expect(res.body.token).toBeDefined();

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
                expect(res.status).toBe(200);
                expect(res.type).toBe("application/json");

                // Perform the next call, to test authentication.
                return sap(app)
                    .post("/users/login")
                    .send(userInvalid);
            }).then((res) => {
            expect(res.status).toBe(200);
            expect(res.type).toBe("application/json");

            expect(res.body).toBeDefined();
            expect(res.body.ok).toBeDefined();
            expect(res.body.ok).toBe(false);

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
            expect(res.status).toBe(200);
            expect(res.type).toBe("application/json");

            expect(res.body).toBeDefined();
            expect(res.body.ok).toBeDefined();
            expect(res.body.ok).toBe(false);

            done();
        }).catch((err) => {
            done(err);
        });
    });
});
