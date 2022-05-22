const { Router } = require('express');
const NoteController = require('../controllers/NotesController')
const { verifyOwnership, validateUser, validateNote } = require('../../../middlewares/middleware');
const {newNoteValidator, updateNoteValidator} = require("../validators/newNote");

const notesRouter = Router();


const notesController = NoteController

notesRouter
    .route('/api/users/:id/notes')
    .post(validateUser, newNoteValidator, notesController.createNote)
    .get(validateUser, notesController.getUserNotes);


notesRouter.get('/api/users/:id/notes/deleted-notes', validateUser, notesController.getTrashedNotes);

notesRouter
    .route('/api/users/:user/notes/:note')
    .get(verifyOwnership, validateNote, notesController.getNoteByID)
    .put(verifyOwnership, validateNote, updateNoteValidator, notesController.updateNote)
    .put(verifyOwnership, validateNote, notesController.restoreTrashedNotes)
    .delete(verifyOwnership, validateNote, notesController.deleteUserNote);



module.exports = notesRouter;
