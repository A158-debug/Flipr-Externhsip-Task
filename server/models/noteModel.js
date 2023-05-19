import mongoose from 'mongoose';

const noteSchema = ({
    title:String,
    message:String,
    likes: {
        type: [String],
        default: [],
    },
})
const NoteSchema = mongoose.model('NoteSchema',noteSchema);

export default NoteSchema