const { Router } = require('express');
const notesRouter = require('./Notes/routes/index');
const userRouter = require('./Users/routes/index');

const router = Router();

router.use(notesRouter);
router.use(userRouter);

module.exports = router;