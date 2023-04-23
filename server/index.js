import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import {getNotes,createNote,updateNote,deleteNote, likeNote} from './controllers/notes.js'

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', getNotes);
app.post('/', createNote);
app.patch('/:id', updateNote);
app.delete('/:id', deleteNote);
app.patch('/:id/likeNote', likeNote);

const CONNECTION_URL = 'mongodb+srv://A158_Debug:xtey3CIJlVbjY4Ry@cluster0.zaeyu.mongodb.net/test';

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT,()=>console.log(`server is running on localhost:${PORT}`)))
.catch((error)=>console.log(error))

