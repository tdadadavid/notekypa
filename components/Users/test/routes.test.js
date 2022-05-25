const request = require('supertest');
const app = require('../../../app');


describe('Notes route', () => {

    const url = `/api/users/${2}/notes`

    describe('POST /api/users/:id/notes', () => {
        it('should create new note', function () {
            return request(app)
                .post(`/api/users/${2}/notes`, )
                .send({
                    title: "test",
                    note: "First test"
                })
                .expect(201);
        });

        it('should throw validation error when title is not given', function () {
            return request(app)
                .post(url)
                .send({
                    note: "Only note is sent",
                })
                .expect(422)
        });

        it('should not throw validation error when note is not given', function () {
            return request(app)
                .post(url)
                .send({
                    title: "Only title given"
                })
                .expect(201);
        });

        it('should not return 404 status code when invalid user is given', function () {
            return request(app)
                .post(`/api/users/${1000}/notes`)
                .send({
                    title: "test",
                    note: "Fail"
                })
                .expect(404)
        });
    });

    describe("Get /api/users/:id/notes", () => {
        const validUser = 2;
        const invalidUser = 1000;

        const validNoteID = 1;
        const invalidNoteID = 1000;

        describe('GET /api/users/:id/notes', () => {

            it('should return note found for a valid user.', async function () {
                const response  =  await request(app)
                    .get(`/api/users/${validUser}/notes/4`);

                expect(response.body.message).toEqual("Note found.");
            });

            it('should throw 401 error when a user tries to access a note that is not its', async function () {
                const response = await  request(app)
                    .get('/api/users/1/notes/4')
                    .expect(401);

                expect(response.body.message).toEqual("Action can't be performed, this is not you're note")
            });

            it('should throw 404 error if an invalid note is given', async function () {
                const response = await request(app)
                    .get('/api/users/2/notes/100')
                    .expect(404);

                expect(response.body.message).toEqual("Note with id 100 not found.");
            });


            it('should return a note for a valid user', async function () {
                const response = await request(app)
                    .get(`/api/users/${validUser}/notes/4`);

                expect(response.body.data[0]).toEqual({
                    id: 4,
                    user_id: 2,
                    title: "Proctus Boeno",
                    note: "Lorem Ipsum colorado.",
                    created_at:"2022-05-19T14:48:23.000Z",
                    updated_at: null,
                    deleted_at: null
                });

            });


        })
    });

    describe("Get /api/users/:id/deleted-notes" ,() => {

        it('should return all deleted notes of a user', function () {
            return request(app)
                .get(`/api/users/${3}/notes/deleted-notes`)
                .expect(200);
        });

        it('should return a message error message ', async function () {
            const response =  await  request(app)
                .get(`/api/users/1/notes/deleted-notes`)
                .expect(404);

            expect(response.body.message).toEqual("You have no deleted note");
        });
    });

});