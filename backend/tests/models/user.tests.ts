import {Users, IUserDocument} from "../../models/user/UserModel";

describe("The user model", () => {
    it("cannot accept a password shorter than 8 characters.", (done) => {
        // Define the test data. We test the boundary.
        const testStringInvalid = "abcd!1";
        const testStringValid = "abcdeF!1";

        // Create a new user.
        const user: IUserDocument = new Users();

        // Attempt to create a password.
        expect(testStringInvalid.length).toBeLessThan(8);
        expect(testStringValid.length).toBe(8);

        expect(user.createPassword(testStringInvalid)).toBeFalsy();
        expect(user.createPassword(testStringValid)).toBeTruthy();

        done();
    });

    it("cannot accept a password without the presence of lowercase, uppercase, digit and a special character.", (done) => {
        // Define the test data. We test the boundary.
        const testStringInvalid1 = "abcdef!1";
        const testStringInvalid2 = "abcdeFg1";
        const testStringInvalid3 = "abcdeF!h";

        // Create a new user.
        const user: IUserDocument = new Users();

        // Attempt to create a password.
        expect(user.createPassword(testStringInvalid1)).toBeFalsy();
        expect(user.createPassword(testStringInvalid2)).toBeFalsy();
        expect(user.createPassword(testStringInvalid3)).toBeFalsy();

        done();
    });

    it("can accept a valid password.", (done) => {
        // Define the test data.
        const testStringValid = "abcdeF!1";

        // Create a new user.
        const user: IUserDocument = new Users();

        // Attempt to create a password.
        expect(user.createPassword(testStringValid)).toBeTruthy();

        done();
    });

    it("cannot validate a hashed password with the wrong input password.", (done) => {
        // Define the test data.
        const testStringValid1 = "abcdeF!1";
        const testStringValid2 = "abcdeF!2";

        // Create a new user.
        const user: IUserDocument = new Users();

        // Set the password.
        user.createPassword(testStringValid1);

        // Attempt to validate the password.
        expect(user.checkPassword(testStringValid2)).toBeFalsy();

        done();
    });

    it("can validate a hashed password with the correct input password.", (done) => {
        // Define the test data.
        const testStringValid1 = "abcdeF!1";

        // Create a new user.
        const user: IUserDocument = new Users();

        // Set the password.
        user.createPassword(testStringValid1);

        // Attempt to validate the password.
        expect(user.checkPassword(testStringValid1)).toBeTruthy();

        done();
    });

    it("cannot change a password with the wrong old password.", (done) => {
        // Define the test data.
        const testStringValid1 = "abcdeF!1";
        const testStringValid2 = "abcdeF!2";

        // Create a new user.
        const user: IUserDocument = new Users();

        // Set the password.
        user.createPassword(testStringValid1);

        // Attempt to change the password.
        expect(user.changePassword(testStringValid2, testStringValid2)).toBeFalsy();

        done();
    });

    it("cannot change a password with the correct old password and a invalid new password.", (done) => {
        // Define the test data.
        const testStringInvalid = "abcdeF!h";
        const testStringValid = "abcdeF!1";

        // Create a new user.
        const user: IUserDocument = new Users();

        // Set the password.
        user.createPassword(testStringValid);

        // Attempt to change the password.
        expect(user.changePassword(testStringValid, testStringInvalid)).toBeFalsy();

        done();
    });

    it("can change a password with the correct old password and a valid new password.", (done) => {
        // Define the test data.
        const testStringValid1 = "abcdeF!1";
        const testStringValid2 = "abcdeF!2";

        // Create a new user.
        const user: IUserDocument = new Users();

        // Set the password.
        user.createPassword(testStringValid1);

        // Attempt to change the password.
        expect(user.changePassword(testStringValid1, testStringValid2)).toBeTruthy();

        done();
    });
});
