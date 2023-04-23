import mongoose from 'mongoose';

const noteSchema = ({
    title:String,
    message:String,
    likeCount: {
        type: Number,
        default: 0,
    },
})
const NoteSchema = mongoose.model('NoteSchema',noteSchema);

export default NoteSchema