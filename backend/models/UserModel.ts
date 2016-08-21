import * as mongoose from "mongoose";
import bcrypt = require("bcryptjs");

import { IUser } from "./IUser";

const rounds = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: /^([^A-Z])*[@]([^A-Z])*/,
        unique: true
    },
    image: String,
    name: String,
    passwordHash: String,
    passwordSalt: String,
    phoneNumber: String,
});

userSchema.methods.changePassword = function(passwordOld: string, passwordNew: string): boolean {
    // Check the old password.
    if (!this.checkPassword(passwordOld)) {
        return false;
    }
    console.log("pw OK");

    // Generate a new password and save it.
    return this.createPassword(passwordNew);
};

userSchema.methods.checkPassword = function(password: string) {
    // Hash the supplied password and compare it.
    const passwordHash = bcrypt.hashSync(password, this.passwordSalt);

    return (passwordHash === this.passwordHash);
};

userSchema.methods.createPassword = function(password: string): boolean {
    // Create a new regular expression.
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d])[.\\S]{8,64}");

    if (!regex.test(password))
    {
        return false;
    }

    // Generate a new salt.
    this.passwordSalt = bcrypt.genSaltSync(rounds);

    // Hash the password and store it.
    this.passwordHash = bcrypt.hashSync(password, this.passwordSalt);

    return true;
};

// Create the document interface.
export interface IUserDocument extends IUser, mongoose.Document { }

// Create the mongoose model.
export const Users = mongoose.model<IUserDocument>("User", userSchema);
