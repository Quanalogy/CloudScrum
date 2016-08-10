// Set the environment to "test".
process.env.NODE_ENV = "test";

// We need to have more than the default 10 listeners.
require("events").EventEmitter.prototype._maxListeners = 100;

import { Users } from "../../models/UserModel";

describe("The user model", () => {
    it("can generate a new password salt, and hash the passed password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Define test data.
        const password1 = "test1";

        // Make sure the password hash and salt are undefined to begin with.
        expect(user["passwordHash"]).toBeUndefined();
        expect(user["passwordSalt"]).toBeUndefined();

        // Set the password.
        user.createPassword(password1);

        // Make sure the password hash and salt are defined and not null.
        expect(user["passwordHash"]).toBeDefined();
        expect(user["passwordSalt"]).toBeDefined();

        // Signal that we are done.
        done();
    });

    it("can validate a password.", (done) => {
        // Generate a new user.
        const user = new Users();

        // Define test data.
        const password1 = "test1";

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

        // Define test data.
        const password1 = "test1";
        const password2 = "test2";

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

        // Define test data.
        const password1 = "test1";
        const password2 = "test2";

        // Set the password.
        user.createPassword(password1);

        // Attempt to change the password.
        user.changePassword(password1, password2);

        // Attempt to validate the password.
        expect(user.checkPassword(password2)).toBe(true);

        // Signal that we are done.
        done();
    });
});
