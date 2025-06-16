const express = require('express');
const userAuth = require('../users/users.middleware')
const blogController = require('./blogs.controller')



const router = express.Router();

router.get('/', blogController.getBlogsController)

router.get('/myblogs', userAuth.AuthroizeUser, blogController.getPersonalBlogs)

router.get('/:id', blogController.getBlogsByIDController)

router.use(userAuth.AuthroizeUser)

router.post('/', blogController.createBlogController)

router.patch('/:id', blogController.updateBlogController)

router.get('/:id/publish', blogController.publishBlogController)

router.delete('/:id', blogController.deleteBlogController)





module.exports = router;