const BlogService = require('./blogs.service')

const isOwner = async (_id, req, res) => {
    response1 = await BlogService.getBlogsByID(_id)
    if (!response1) {
        return res.status(400).json({
            message: 'Blog does not exist'
        })
    }
    if (response1.authorID != req.user.authorID) {
        return res.status(400).json({
            message: 'Cannot Update Other\'s Blogs'
        })
    }
}

const getBlogsController = async (req, res) => {
    try {
        const { author, title, tags } = req.query

        const response = await BlogService.getAllBlogs({
            author,
            title,
            tags
        })

        return res.status(200).json({
            message: 'Blogs retrieved successfully',
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const getBlogsByIDController = async (req, res) => {
    try {
        const id = req.params.id

        const response = await BlogService.getBlogsByID(id)
        if (response) {
            return res.status(200).json({
                message: 'Blogs retrieved successfully',
                data: response
            })
        } else{
            return res.status(400).json({
                error: 'Blog does not exist'
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const getPersonalBlogs = async (req, res) => {
    try {
        const {state} = req.query
        const user = req.user
        authorID = user['authorID']

        const response = await BlogService.getMyBlogs({ authorID, state })

        return res.status(200).json({
            message: 'Blogs retrieved successfully',
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const createBlogController = async (req, res) => {
    try {
        const payload = req.body
        const user = req.user

        const response = await BlogService.CreateBlog({
            title: payload.title,
            description: payload.description,
            author: `${user.firstName} ${user.lastName}`,
            authorID: user.authorID,
            tags: payload.tags,
            body: payload.body,
            time_stamp: Date.now()
        })

        if (response) {
            return res.status(201).json({
                message: 'Blog created successfully',
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const publishBlogController = async (req, res) => {
    try {
        _id = req.params.id
        await isOwner(_id, req, res)

        response = await BlogService.publishMyBlog(_id)
        if (response) {
            return res.status(200).json({
                message: 'Blog was published',
                data: response2
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const updateBlogController = async (req, res) => {
    try {
        _id = req.params.id
        await isOwner(_id, req, res)
        payload = req.body

        if (payload.authorID) {
            return res.status(400).json({
                message: "Error: authorID cannot be changed"
            })
        }
        response = await BlogService.updateMyBlog(_id, payload)

        if (response) {
            return res.status(200).json({
                message: "Blog Updated",
                response: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }

}

const deleteBlogController = async (req, res) => {
    try {
        _id = req.params.id
        await isOwner(_id, req, res)
        response = await BlogService.deleteMyBlog(_id)
        if (response) {
            res.status(200).json({
                message: 'Blog Deleted'
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }


}

module.exports = {
    getBlogsController,
    getBlogsByIDController,
    getPersonalBlogs,
    createBlogController,
    publishBlogController,
    updateBlogController,
    deleteBlogController
}