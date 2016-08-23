import sap = require("supertest-as-promised");

import {app} from "../../app";
import {connect, dropDatabase} from "../../config/mongodb";

beforeAll((done) => {
    // Connect to the database.
    connect().then(done);
});

describe("The /users route", () => {
    it("has the expected routes and no more.");

    it("has authentication on the expected routes.");

    describe("get /", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("returns an empty array of users if none are present.");

        it("returns an array of users if one is present.");

        it("returns an array of users if more are present.");
    });

    describe("get /:email", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("returns a single user if one is present.");

        it("returns no user if none are present.");
    });

    describe("patch /", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("can handle malformed data.");

        it("can patch a single parameter on the specified user.");

        it("can patch multiple parameters on the specified user.");

        it("cannot patch a non-existing user.");
    });

    describe("post /", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("can handle malformed data.");

        it("can create a user.");
    });

    describe("post /login", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("can handle malformed data.");

        it("can authenticate an existing user with the right credentials.");

        it("cannot authenticate an existing user with the wrong credentials.");

        it("cannot authenticate a non-existing user.");
    });

    describe("put /", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("can handle malformed data.");
    });

    describe("delete /", () => {
        beforeEach((done) => {
            dropDatabase().then(done);
        });

        it("can handle malformed data.");
    });
});
