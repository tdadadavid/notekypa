const UserController = require('../controllers/UserController');
const NoteController = require('../controllers/NotesController');
const { verifyUser } = require('../middlewares/middleware');

const express = require('express');
const router = express.Router();


const userController =  UserController;
router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', userController.getUser);
router.post('/api/users', userController.createUser);
router.put('/api/users/:id', userController.updateUser);


const notesController = NoteController
router.post('/api/users/:id/notes', notesController.createNote);
router.get('/api/users/:id/notes', notesController.getUserNotes);

module.exports = router;