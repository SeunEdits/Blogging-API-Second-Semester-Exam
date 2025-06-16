const Blogs = require('./blogs.model')
const Mongoose = require('mongoose')


const CreateBlog = async ({
    title,
    description,
    authorID,
    tags,
    body,
    time_stamp
}) => {

    const createBlog = await Blogs.create({
        title,
        description,
        authorID,
        tags,
        body,
        time_stamp
    })

    return createBlog
}

const getAllBlogs = async ({ id, state }) => {
    const query = {}

    if (id) {
        query.id = id
    }

    if (state) {
        query.state = state
    }
    console.log(query)
    const blogs = await Blogs.find(query)

    return blogs
}

const getBlogsByID = async (id) => {
    _id = new Mongoose.Types.ObjectId(id)

    const blog = await Blogs.findOne(_id)
    return blog
}

const getMyBlogs = async (authorID) => {
    const blogs = await Blogs.find(authorID)

    return blogs
}

const publishMyBlog = async (id) => {
    const blogID = new Mongoose.Types.ObjectId(id)
    
    const blog = await Blogs.updateOne({"_id": blogID}, {$set: {"state": "published"}})
    return blog
}

const updateMyBlog = async (id, payload) => {
    const blogID = new Mongoose.Types.ObjectId(id)
    console.log (payload)
    const blog = await Blogs.updateOne({"_id": blogID}, {$set: payload})
    
    return blog

}

const deleteMyBlog = async (id) => {
    const blogID = new Mongoose.Types.ObjectId(id)
    const blog = await Blogs.deleteOne({"_id": blogID})

    return blog

}

module.exports = {
    CreateBlog,
    getAllBlogs,
    getBlogsByID,
    getMyBlogs,
    publishMyBlog,
    updateMyBlog,
    deleteMyBlog
}