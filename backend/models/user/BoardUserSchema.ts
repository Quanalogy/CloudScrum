import {Schema} from "mongoose";

export const boardUserSchema = new Schema({
    id: Schema.Types.ObjectId,
    role: {
        type: String,
        enum: ["A", "B"]
    }
});
