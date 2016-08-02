import mongoose = require("mongoose");
import bluebird = require("bluebird");


// Get the connection string from the environment. Default to localhost with no password.
const mongodbDatabase: string = process.env.MONGODBDATABASE || "ScrumOnline";
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

// State variables to easier handle the different possibilities in the readyState property.
const mongooseDisconnected = 0;
const mongooseConnected = 1;
const mongooseConnecting = 2;
const mongooseDisconnecting = 3;

const connectionPromise = new Promise<mongoose.Connection>((resolve, reject) => {
    // Check if we have already connected, or are in the process of connecting.
    const connectionState = mongoose.connection.readyState;

    if (connectionState === mongooseDisconnected || connectionState === mongooseDisconnecting) {
        // Perform the connect call with the proper connection string.
        mongoose.connect(getConnectionString(), (err) => {
            if (err) {
                reject();
            }
        });

        mongoose.connection.on("open", () => {
            resolve(mongoose.connection)
        });
    } else if (connectionState === mongooseConnecting) {
        mongoose.connection.on("open", () => {
            resolve(mongoose.connection)
        });
    } else {
        resolve(mongoose.connection);
    }
});

export function connect(): Promise<mongoose.Connection> {
    return connectionPromise;
}
