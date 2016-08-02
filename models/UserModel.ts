import * as mongoose from "mongoose";

import bcrypt = require("bcryptjs");

const rounds = 10;

import { IUser } from "./IUser";

const userSchema = new mongoose.Schema({
    email: String,
    image: String,
    name: String,
    passwordHash: String,
    passwordSalt: String,
    phoneNumber: String,
});

userSchema.methods.checkPassword = function(password: string) {
    // Hash the supplied password and compare it.
    const passwordHash = bcrypt.hashSync(password, this.passwordSalt);

    return (passwordHash === this.passwordHash);
};

userSchema.methods.createPassword = function(password: string) {
    // Generate a new salt.
    this.passwordSalt = bcrypt.genSaltSync(rounds);

    // Hash the password and store it.
    this.passwordHash = bcrypt.hashSync(password, this.passwordSalt);
};

// Create the document interface.
export interface IUserDocument extends IUser, mongoose.Document { }

// Create the mongoose model.
export const Users = mongoose.model<IUserDocument>("User", userSchema);
