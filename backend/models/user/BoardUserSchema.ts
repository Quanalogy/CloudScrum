import * as mongoose from "mongoose";
import {IBoardUser} from "./IBoardUser";

import {ERoles} from "./ERole";

export const boardUserSchema = new mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
    role: {
        type: String,
        enum: [ERoles.ScrumMaster, ERoles.ScrumUser]
    }
});

export interface IBoardUserDocument extends IBoardUser, mongoose.Document{}

export const BoardUsers = mongoose.model<IBoardUserDocument>("BoardUsers", boardUserSchema);