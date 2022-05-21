const { Router } = require('express');
const notesRouter = require('./Notes/routes');
const userRouter = require('./Users/routes');

const router = Router();

router.use(userRouter);
router.use(notesRouter);

module.exports = router;