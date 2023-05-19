import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import userRoutes from './routes/user.js'
import notesRoutes from './routes/notes.js'

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


app.use('/posts',notesRoutes)
app.use('/user',userRoutes)

const CONNECTION_URL = 'mongodb+srv://A158_Debug:xtey3CIJlVbjY4Ry@cluster0.zaeyu.mongodb.net/test';

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT,()=>console.log(`server is running on localhost:${PORT}`)))
.catch((error)=>console.log(error))

