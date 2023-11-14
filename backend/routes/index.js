const express = require('express');
const { signupController, loginController } = require('../controllers/authController');
const { authMiddleWare } = require('../middlewares/middleware');
const { createPostController, getPostController, updatePostController, deletePostController } = require('../controllers/blogController');
const router = express.Router();

//auth
router.post('/api/signup', signupController);
router.post('/api/login', loginController)

//post
router.post('/api/blog', [authMiddleWare], createPostController)
router.get('/api/blog', [authMiddleWare], getPostController)
router.put('/api/blog/:id', [authMiddleWare], updatePostController)
// router.delete('/api/blog/:id', /* [authMiddleWare], */ deletePostController)



module.exports = router;