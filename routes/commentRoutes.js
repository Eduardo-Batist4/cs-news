const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// helpers
const checkAuth  = require('../helpers/auth').checkAuth    

router.get('/', CommentController.showComments);

router.get('/dashboard', CommentController.dashboard);

router.get('/add', CommentController.createComment);
router.post('/add', CommentController.createCommentSave);

router.get('/edit/:id', CommentController.updateComment);
router.post('/edit', CommentController.updateCommentSave);

router.post('/remove', CommentController.removeComment);

module.exports = router;