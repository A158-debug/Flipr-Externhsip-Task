import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import userRoutes from './routes/user.js'
import postsRoutes from './routes/posts.js'

const app = express();
const PORT = 5000;

// app.use(bodyParser.json());
app.use(express.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());


app.use('/posts',postsRoutes)
app.use('/user',userRoutes)

const CONNECTION_URL = 'mongodb+srv://A158_Debug:xtey3CIJlVbjY4Ry@cluster0.zaeyu.mongodb.net/test';

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT,()=>console.log(`server is running on localhost:${PORT}`)))
.catch((error)=>console.log(error))

