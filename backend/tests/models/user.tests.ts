import {Users} from "../../models/UserModel";

describe("The user model", () => {
    it("cannot accept a password shorter than 8 characters.");

    it("cannot accept a password longer than 64 characters.");

    it("cannot accept a password without the presence of lowercase, uppercase, digit and a special character.");

    it("cannot accept a valid password.");

    it("cannot change a password with the wrong old password.");

    it("cannot change a password with the correct old password and a invalid new password.");

    it("can change a password with the correct old password and a valid new password.");

    it("cannot validate a hashed password with the wrong input password.");

    it("can validate a hashed password with the correct input password.");
});
