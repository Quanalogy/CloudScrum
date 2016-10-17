import Promise = require("bluebird");

import {connect, dropDatabase} from "../../config/mongodb";
import {getAllProjects, getProject, getAllProjectsForUser} from "../../controllers/project/read";
import {createUser} from "../../controllers/user/userControllerCreate";
import {create} from "../../controllers/project/create";
import {IProjectDocument} from "../../models/project/Project";
import {getUser} from "../../controllers/user/userControllerRead";

beforeAll((done) => {
    // Connect to the database.
    connect().then(done);
});

describe("The project controller", () => {
    describe("create module", () => {
        beforeAll((done) => {
            // Define common test data.
            this.testData = {
                testEmailMaster: "this@master.com",
                testEmailUser1: "this@user.1.com",
                testEmailUser2: "this@user.2.com",
                testPassword: "abcdeF1!",
                projectName: "testProject"
            };

            // Cleanup the database and inject users.
            dropDatabase().then(() => {
                return createUser(this.testData.testEmailMaster, this.testData.testPassword);
            }).then(() => {
                return createUser(this.testData.testEmailUser1, this.testData.testPassword);
            }).then(() => {
                return createUser(this.testData.testEmailUser2, this.testData.testPassword);
            }).then(done);
        });

        it("cannot create a project with no name", (done) => {
            create(null, this.testData.testEmailMaster).then(() => {
                fail("Promise should be rejected.");
            }, () => {
                //
            }).finally(() => {
                done();
            });
        });

        it("cannot create a project with a blank name", (done) => {
            create({name: ""}, this.testData.testEmailMaster).then(() => {
                fail("Promise should be rejected.");
            }, () => {
                //
            }).finally(() => {
                done();
            });
        });

        it("can not create a project without a ScrumMaster.", (done) => {
            create(this.testData.projectName, "").then(() => {
                fail("Promise should be rejected.");
            }, () => {
                //
            }).finally(() => {
                done();
            });
        });

        it("can create a project with a ScrumMaster.", (done) => {
            create(this.testData.projectName, this.testData.testEmailMaster).then((result) => {
                expect(result).toBeDefined();
                expect(result.name).toBeDefined();
                expect(result.name).toBe(this.testData.projectName);
                // TODO: Check user.
            }, () => {
                fail("Promise should be fulfilled.");
            }).finally(() => {
                done();
            });
        });

        it("can create a project with a ScrumMaster and users.", (done) => {
            create(this.testData.projectName, this.testData.testEmailMaster, [this.testData.testEmailUser1, this.testData.testEmailUser2]).then((result) => {
                expect(result).toBeDefined();
                expect(result.name).toBeDefined();
                expect(result.name).toBe(this.testData.projectName);
                // TODO: Check user.
            }, () => {
                fail("Promise should be fulfilled.");
            }).finally(() => {
                done();
            });
        });
    });

    describe("get module", () => {
        beforeEach((done) => {
            // Define common test data.
            this.testData = {
                testEmailMaster: "this@master.com",
                testEmailUser1: "this@user.1.com",
                testEmailUser2: "this@user.2.com",
                testPassword: "abcdeF1!",
                projectName: "testProject"
            };

            // Cleanup the database and inject users.
            dropDatabase().then(() => {
                return createUser(this.testData.testEmailMaster, this.testData.testPassword);
            }).then(() => {
                return createUser(this.testData.testEmailUser1, this.testData.testPassword);
            }).then(() => {
                return createUser(this.testData.testEmailUser2, this.testData.testPassword);
            }).then(done);
        });

        it("cannot get all projects when none are present.", (done) => {
            // Attempt to get all projects.
            getAllProjects().then((result) => {
                expect(result).toBeDefined();
                expect(result.length).toBe(0);
            }, () => {
                fail("Promise should be fulfilled.");
            }).finally(() => {
                done();
            });
        });

        it("can get all projects when one is present.", (done) => {
            // Inject a project.

            // Attempt to get all users.
            getAllProjects().then((result) => {
                expect(result).toBeDefined();
                expect(result.length).toBe(1);
            }, () => {
                fail("Promise should be fulfilled.");
            }).finally(() => {
                done();
            });
        });

        it("can get all projects when multiple are present.", (done) => {
            // Inject multiple projects.

            // Attempt to get all users.
            getAllProjects().then((result) => {
                expect(result).toBeDefined();
                expect(result.length).toBe(2);
            }, () => {
                fail("Promise should be fulfilled.");
            }).finally(() => {
                done();
            });
        });

        it("cannot get a project when none are present.");

        it("cannot get a project when with a non-existing id.");

        it("can get a project when with an existing id.");

        it("can get all projects related to a user.", (done) => {
            // Inject projects.
            create(this.testData.projectName, this.testData.testEmailUser1, [this.testData.testEmailMaster]).then(() => {
                return create(this.testData.projectName, this.testData.testEmailMaster);
            }).then(() => {
                // Get the user.
                return getUser(this.testData.testEmailMaster);
            }).then((user) => {
                return getAllProjectsForUser(user._id);
            }).then((projects) => {
                expect(projects).toBeDefined();
                expect(projects.length).toBe(2);
            }).finally(() => {
                done();
            });
        });
    });
});
