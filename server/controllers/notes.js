import NoteSchema from '../models/noteModel.js'
import mongoose from 'mongoose'

export const getNotes = async (req, res) => {
    try {
        const noteMessage = await NoteSchema.find()
        res.status(200).json({ noteMessage })
    } catch (error) {
        console.log(error);
    }
}

export const createNote = async (req, res) => {
    const { title, message } = req.body;
    const newNoteMessage = new NoteSchema({ title, message });
    try {
        await newNoteMessage.save();
        res.status(201).json(newNoteMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, message } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {title, message, _id: id };
    await NoteSchema.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await NoteSchema.findByIdAndRemove(id);
    res.json({ message: "Note deleted successfully." });
}

export const likeNote = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: "Unauthticated"})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await NoteSchema.findById(id);

    const index = post.likes.findIndex((id)=>id=== String(req.userId));
    if( index === -1 ) post.likes.push(req.userId);                // --- Like the post ----
    else post.likes = post.likes.filter((id)=> id !== req.userId)  // --- Dislike the post -----
    const updatedPost = await NoteSchema.findByIdAndUpdate(id, post, { new: true });
   
    res.json(updatedPost);
}