const { Router } = require('express');
const NoteController = require('../controllers/NotesController')
const { verifyOwnership, validateUser } = require('../../../middlewares/middleware');

const notesRouter = Router();


const notesController = NoteController
notesRouter
    .route('/api/users/:id/notes')
    .post(validateUser, notesController.createNote)
    .get(validateUser, notesController.getUserNotes);

notesRouter.get('/api/users/:id/notes/deleted',validateUser, notesController.getTrashedNotes);
notesRouter.delete('/api/users/:user/notes/:note', verifyOwnership, notesController.deleteUserNote);

module.exports = notesRouter;