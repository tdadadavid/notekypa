const UserController = require('../controllers/UserController');
const NoteController = require('../controllers/NotesController');
const { verifyOwnership, validateUser, ensureUniqueEmail } = require('../middlewares/middleware');

const express = require('express');
const router = express.Router();


const userController =  UserController;
router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', userController.getUser);
router.post('/api/users', ensureUniqueEmail, userController.createUser);
router.put('/api/users/:id', userController.updateUser);


const notesController = NoteController
router.post('/api/users/:id/notes',validateUser, notesController.createNote);
router.get('/api/users/:id/notes', validateUser, notesController.getUserNotes);
router.get('/api/users/:id/notes/deleted',validateUser, notesController.getTrashedNotes);
router.delete('/api/users/:user/notes/:note', verifyOwnership, notesController.deleteUserNote);

module.exports = router;