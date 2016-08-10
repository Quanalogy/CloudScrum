// Set the environment to "test".
process.env.NODE_ENV = "test";

// We need to have more than the default 10 listeners.
require("events").EventEmitter.prototype._maxListeners = 100;

import { Users } from "../../models/UserModel";

import { assert } from "chai";

// Define common test data.
const password1 = "abcde?1H";
const password2 = "abcde!1H";
const invalidPassword1 = "abcdefgh";
const invalidPassword2 = "abcdefgH";
const invalidPassword3 = "abcdef1H";
const invalidPassword4 = "abde!1H";
const invalidPassword5 = "abcdef1Habcdef1Habcdef1Habcdef1Habcdef1Habcdef1Habcdef1Habcdef1Ha";

describe("The user model", () => {
    it("can generate a new password salt, and hash the passed password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Make sure the password hash and salt are undefined to begin with.
        assert.isUndefined(user["passwordHash"]);
        assert.isUndefined(user["passwordSalt"]);

        // Set the password.
        assert.isTrue(user.createPassword(password1));

        // Make sure the password hash and salt are defined and not null.
        assert.isDefined(user["passwordHash"]);
        assert.isDefined(user["passwordSalt"]);

        // Signal that we are done.
        done();
    });

    it("cannot create hash from an invalid password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Make sure the password hash and salt are undefined to begin with.
        assert.isUndefined(user["passwordHash"]);
        assert.isUndefined(user["passwordSalt"]);

        // Set the password.
        assert.isFalse(user.createPassword(invalidPassword1), invalidPassword1);
        assert.isFalse(user.createPassword(invalidPassword2), invalidPassword2);
        assert.isFalse(user.createPassword(invalidPassword3), invalidPassword3);
        assert.isFalse(user.createPassword(invalidPassword4), invalidPassword4);
        assert.isFalse(user.createPassword(invalidPassword5), invalidPassword5);

        // Make sure the password hash and salt are defined and not null.
        assert.isUndefined(user["passwordHash"]);
        assert.isUndefined(user["passwordSalt"]);

        // Signal that we are done.
        done();
    });

    it("can validate a password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Attempt to validate the password.
        assert.isFalse(user.checkPassword(password1));

        // Set the password.
        user.createPassword(password1);

        // Attempt to validate the password with valid data.
        assert.isTrue(user.checkPassword(password1));

        // Signal that we are done.
        done();
    });

    it("cannot validate an invalid password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Set the password.
        user.createPassword(password1);

        // Attempt to validate the password with valid data.
        assert.isTrue(user.checkPassword(password1));

        // Attempt to validate the password with invalid data.
        assert.isFalse(user.checkPassword(password2));

        // Signal that we are done.
        done();
    });

    it("can change a password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Set the password.
        user.createPassword(password1);

        // Attempt to change the password.
        assert.isTrue(user.changePassword(password1, password2));

        // Attempt to validate the password.
        assert.isTrue(user.checkPassword(password2));

        // Signal that we are done.
        done();
    });

    it("cannot change the password with the wrong password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Set the password.
        user.createPassword(password1);

        // Attempt to change the password.
        assert.isFalse(user.changePassword(password2, password2));

        // Signal that we are done.
        done();
    });

    it("cannot change the password with an invalid password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Set the password.
        user.createPassword(password1);

        // Attempt to change the password.
        assert.isFalse(user.changePassword(password1, invalidPassword1));

        // Signal that we are done.
        done();
    });
});
