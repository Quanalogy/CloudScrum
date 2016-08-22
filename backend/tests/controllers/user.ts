import {connect, dropDatabase} from "../../config/mongodb";
import {Users, IUserDocument} from "../../models/UserModel";

beforeAll((done) => {
    // Connect to the database.
    connect().then(done);
});

describe("The user controller", () => {
    describe("create module", () => {
        beforeEach((done) => {
            // Define common test data.
            // TODO: Define common test data.

            // Stub the password creation in the model, to save time during tests. This is already tested in the model.

            // Cleanup the database before each test.
            dropDatabase().then(done);
        });

        it("cannot create a user with in invalid email.");

        it("cannot create a user with in invalid password.");

        it("cannot create a user which exists in the database.");

        it("can create a user with valid data.");

        it("does convert uppercase emails to lowercase.");
    });

    describe("patch module", () => {

    });

    describe("read module", () => {

    });
});
