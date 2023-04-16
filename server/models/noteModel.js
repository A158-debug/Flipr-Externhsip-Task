import mongoose from 'mongoose';

const noteSchema = ({
    title:String,
    message:String,
})
const NoteSchema = mongoose.model('NoteSchema',noteSchema);

export default NoteSchema