const PostSchema = require('../models/postModel.js');
const mongoose = require('mongoose');

exports.getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1);
        const total = await PostSchema.countDocuments({});

        const posts = await PostSchema.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error });
    }
};

exports.getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostSchema.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostSchema({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostSchema.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostSchema.findByIdAndRemove(id);
    res.json({ message: "Note deleted successfully." });
};

exports.getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");
        const posts = await PostSchema.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ error });
    }
};

exports.getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostSchema.find({ name });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostSchema.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) post.likes.push(req.userId);
    else post.likes = post.likes.filter((id) => id !== String(req.userId));

    const updatedPost = await PostSchema.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

exports.commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostSchema.findById(id);

    post.comments.push(value);

    const updatedPost = await PostSchema.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};
