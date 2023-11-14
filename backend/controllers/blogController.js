const mongoose = require('mongoose');
const PostModel = require("../model/blogSchema");

const createPostController = async (req, res) => {
    try {
        const body = req.body;
        const objToSend = {
            title: body.title,
            desc: body.desc,
            author: body.author,
            user_id: body.userId
        }
        const data = await PostModel.create(objToSend)
        res.json({
            message: "Blog Published Successfullly",
            data,
            status: true
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message,
            data: null,
            status: false
        })
    }
}

const getPostController = async (req, res) => {
    try {
        const userRecords = await PostModel.find({});
        console.log(userRecords);
        res.json({
            message: 'Got Data Successfully',
            status: true,
            data: userRecords
        })
    } catch (error) {
        res.json({
            message: error,
            status: false,
            data: null
        })
    }
}

const updatePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        // const objectId = await mongoose.Types.ObjectId(id);
        const userRecords = await PostModel.findByIdAndUpdate(id, body);
        /* console.log(userRecords); */
        res.json({
            message: "update blog",
            status: true,
            data: userRecords
        })
    } catch (error) {
        res.json({
            message: error.message || "An error occurred",
            status: false,
            data: null
        });
    }
}

const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const blogd = mongoose.Types.ObjectId(blogId);
        const userRecords = await PostModel.findByIdAndDelete(id)
        console.log(userRecords);
        res.json({
            message: "delete blog",
            status: true,
            data: userRecords
        })
    } catch (error) {
        res.json({
            message: error.message || "An error occurred",
            status: false,
            data: null
        });
    }
}

module.exports = {
    createPostController,
    getPostController,
    updatePostController,
    deletePostController
}