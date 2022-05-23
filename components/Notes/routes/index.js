const { Router } = require('express');
const NoteController = require('../controllers/NotesController')
const { verifyOwnership, validateUser, validateNote, validateDeletedNote } = require('../../../middlewares');
const newNoteValidator = require("../validators/newNote");
const updateNoteValidator = require("../validators/updateNote");

const notesRouter = Router();

const notesController = NoteController

notesRouter
    .route('/api/users/:id/notes')
    .post(validateUser, newNoteValidator, notesController.createNote)
    .get(validateUser, notesController.getUserNotes);


notesRouter.get('/api/users/:id/notes/deleted-notes', validateUser, notesController.getTrashedNotes);
notesRouter.put('/api/users/:id/notes/:deletedNoteID', validateUser, validateDeletedNote, notesController.restoreTrashedNotes);

notesRouter
    .route('/api/users/:user/notes/:note')
    .get(verifyOwnership, validateNote, notesController.getNoteByID)
    // .put(verifyOwnership, validateNote, updateNoteValidator, notesController.updateNote)
    .delete(verifyOwnership, validateNote, notesController.deleteUserNote);



module.exports = notesRouter;
