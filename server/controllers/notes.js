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
    // console.log({title,message})
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
    console.log(id);
    console.log(title,message)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {title, message, _id: id };
    await NoteSchema.findByIdAndUpdate(id, updatedPost, { new: true });
    console.log(updatedPost)
    res.json(updatedPost);
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    console.log(id) 
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await NoteSchema.findByIdAndRemove(id);
    res.json({ message: "Note deleted successfully." });
}