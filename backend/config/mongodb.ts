import * as mongoose from "mongoose";

// Set the promise library.
mongoose.Promise = require("bluebird");
import Promise = require("bluebird");

// Define constants for the different states. Taken from http://mongoosejs.com/docs/api.html#connection_Connection-readyState
const disconnected = 0;
const connected = 1;
const connecting = 2;
const disconnecting = 3;

// Get the connection string from the environment. Default to localhost with no password.
const mongodbDatabase: string = process.env.MONGODBDATABASE || "CloudScrum";
const mongodbHost: string = process.env.MONGODBHOST || "localhost";
const mongodbPassword: string = process.env.MONGODBPASSWORD || "";
const mongodbPort: string = process.env.MONGODBPORT || "";
const mongodbUser: string = process.env.MONGODBUSER || "";

function getConnectionString(): string {
    let connectionString = "mongodb://";

    if (mongodbUser !== "") {
        connectionString += mongodbUser + ":" + mongodbPassword + "@";
    }

    connectionString += mongodbHost;

    if (mongodbPort !== "") {
        connectionString += ":" + mongodbPort;
    }

    connectionString += "/" + mongodbDatabase;

    return connectionString;
}

export function dropDatabase(): Promise<mongoose.Connection> {
    // Variable for easy access to the mongoose connection.
    const conn = mongoose.connection;

    return new Promise<mongoose.Connection>((resolve, reject) => {
        conn.db.dropDatabase((err) => {
            if (err) {
                reject(err);
            }

            resolve(conn);
        });
    });
}

export function connect(): Promise<mongoose.Connection> {
    // Variable for easy access to the mongoose connection.
    const conn = mongoose.connection;

    // Read out the current state of the connection.
    const currentState = conn.readyState;

    // Return a promise depending on the state.
    return new Promise<mongoose.Connection>((resolve, reject) => {
        if (currentState === connected) {
            // We are already connected, no need to do anything.
            resolve(conn);
        } else if (currentState === disconnecting) {
            // We are in the process of disconnecting. Nothing to do now but return an error.
            reject("In the process of disconnecting.");
        } else if (currentState === disconnected) {
            // Start connecting.
            mongoose.connect(getConnectionString(), (err) => {
                if (err) {
                    reject(err);
                }
            });
        }

        // If we are here, we are either already connecting or have just begun. We register a callback for when the connection is open.
        conn.on("open", () => {
            resolve(conn);
        });
    });
}
