import * as mongoose from "mongoose";

import { User } from "./UserClass";

const userSchema = new mongoose.Schema({
    email: String,
    image: String,
    name: String,
    passwordHash: String,
    passwordSalt: String,
    phoneNumber: String,
});

// Register methods from the class in the schema.
for (let key in User) {
    if (typeof(key) === "function") {
        // Found a function, store a reference in the schema.
        userSchema.method(key, User[key]);
    }
}

// Create the document interface.
export interface IUserDocument extends User, mongoose.Document { }

// Create the mongoose model.
export const Users = mongoose.model<IUserDocument>("User", userSchema);
