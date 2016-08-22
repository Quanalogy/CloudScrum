import {connect, dropDatabase} from "../../config/mongodb";
import {Users, IUserDocument} from "../../models/UserModel";
import {createUser} from "../../controllers/user/userControllerCreate";

import Promise = require("bluebird");


beforeAll((done) => {
    // Connect to the database.
    connect().then(done);
});

describe("The user controller", () => {
    describe("create module", () => {
        beforeEach((done) => {
            // Define common test data.
            this.testData = {
                validEmail1: "this@is.valid.com",
                validEmail2: "this@is.also.valid.com",
                validEmail1UpperCase: "THIS@is.valid.com",
                invalidEmail: "this.is.invalid",
                validPassword: "abcdeF1!",
                invalidPassword: "abcdef1!"
            };

            // Stub the password creation in the model, to save time during tests. This is already tested in the model.

            // Cleanup the database before each test.
            dropDatabase().then(done);
        });

        it("cannot create a user with in invalid email.", (done) => {
            // Create a new user.
            createUser(this.testData.invalidEmail, this.testData.validPassword).then(() => {
                fail(new Error("Promise should not be fulfilled."));
            }, (err) => {
                // Check that we failed on the email.
                expect(err).toBeDefined();
                expect(err.name).toBeDefined();
                expect(err.name).toBe("ValidationError");
                expect(err.errors).toBeDefined();
                expect(err.errors.email).toBeDefined();
            }).finally(() => {
                done();
            });
        });

        it("cannot create a user with in invalid password.", (done) => {
            // Create a new user.
            createUser(this.testData.validEmail1, this.testData.invalidPassword).then(() => {
                fail(new Error("Promise should not be fulfilled."));
            }, (err) => {
                // Check that we failed on the email.
                expect(err).toBeDefined();
                expect(err).toBe("Password");
            }).finally(() => {
                done();
            });
        });

        it("cannot create a user which exists in the database.", (done) => {
            createUser(this.testData.validEmail1, this.testData.validPassword).then(() => {
                return createUser(this.testData.validEmail1, this.testData.validPassword);
            }).then(() => {
                fail(new Error("Promise should not be fulfilled."));
            }, (err) => {
                // TODO: Catch error here.
                expect(err).toBeDefined();
            }).finally(() => {
                done();
            });
        });

        it("can create a user with valid data.", (done) => {
            // Create a new user.
            createUser(this.testData.validEmail1, this.testData.validPassword).then((user) => {
                // Check that the data matches.
                expect(user.email).toBeDefined();
                expect(user.email).toBe(this.testData.validEmail1);
            }, () => {
                fail(new Error("Promise should be fulfilled."));
            }).finally(() => {
                done();
            });
        });

        it("does convert uppercase emails to lowercase.", (done) => {
            // Create a new user.
            createUser(this.testData.validEmail1UpperCase, this.testData.validPassword).then((user) => {
                // Check that the data matches.
                expect(user.email).toBeDefined();
                expect(user.email).toBe(this.testData.validEmail1);
            }, () => {
                fail(new Error("Promise should be fulfilled."));
            }).finally(() => {
                done();
            });
        });
    });

    describe("patch module", () => {

    });

    describe("read module", () => {

    });
});
