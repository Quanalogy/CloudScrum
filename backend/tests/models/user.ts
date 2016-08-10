// Set the environment to "test".
process.env.NODE_ENV = "test";

// We need to have more than the default 10 listeners.
require("events").EventEmitter.prototype._maxListeners = 100;

import { Users } from "../../models/UserModel";

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
        expect(user["passwordHash"]).toBeUndefined();
        expect(user["passwordSalt"]).toBeUndefined();

        // Set the password.
        expect(user.createPassword(password1)).toBe(true);

        // Make sure the password hash and salt are defined and not null.
        expect(user["passwordHash"]).toBeDefined();
        expect(user["passwordSalt"]).toBeDefined();

        // Signal that we are done.
        done();
    });

    it("cannot create hash from an invalid password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Make sure the password hash and salt are undefined to begin with.
        expect(user["passwordHash"]).toBeUndefined();
        expect(user["passwordSalt"]).toBeUndefined();

        // Set the password.
        expect(user.createPassword(invalidPassword1)).toBe(false, invalidPassword1);
        expect(user.createPassword(invalidPassword2)).toBe(false, invalidPassword2);
        expect(user.createPassword(invalidPassword3)).toBe(false, invalidPassword3);
        expect(user.createPassword(invalidPassword4)).toBe(false, invalidPassword4);
        expect(user.createPassword(invalidPassword5)).toBe(false, invalidPassword5);

        // Make sure the password hash and salt are defined and not null.
        expect(user["passwordHash"]).toBeUndefined();
        expect(user["passwordSalt"]).toBeUndefined();

        // Signal that we are done.
        done();
    });

    it("can validate a password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Attempt to validate the password.
        expect(user.checkPassword(password1)).toBe(false);

        // Set the password.
        user.createPassword(password1);

        // Attempt to validate the password with valid data.
        expect(user.checkPassword(password1)).toBe(true);

        // Signal that we are done.
        done();
    });

    it("cannot validate an invalid password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Set the password.
        user.createPassword(password1);

        // Attempt to validate the password with valid data.
        expect(user.checkPassword(password1)).toBe(true);

        // Attempt to validate the password with invalid data.
        expect(user.checkPassword(password2)).toBe(false);

        // Signal that we are done.
        done();
    });

    it("can change a password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Set the password.
        user.createPassword(password1);

        // Attempt to change the password.
        expect(user.changePassword(password1, password2)).toBe(true);

        // Attempt to validate the password.
        expect(user.checkPassword(password2)).toBe(true);

        // Signal that we are done.
        done();
    });

    it("cannot change the password with the wrong password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Set the password.
        user.createPassword(password1);

        // Attempt to change the password.
        expect(user.changePassword(password2, password2)).toBe(false);

        // Signal that we are done.
        done();
    });

    it("cannot change the password with an invalid password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Set the password.
        user.createPassword(password1);

        // Attempt to change the password.
        expect(user.changePassword(password1, invalidPassword1)).toBe(false);

        // Signal that we are done.
        done();
    });
});
