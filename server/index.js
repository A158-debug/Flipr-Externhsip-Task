import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'
import {fileURLToPath} from 'url';

import 'dotenv/config'

import userRoutes from './routes/user.js'
import postsRoutes from './routes/posts.js'

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// console.log(__dirname)
const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors({ origin: '*', credentials: true, }))

// ! For production level
app.use(express.static(path.join(__dirname, '../frontend/build', 'index.html')));

app.use('/posts', postsRoutes)
app.use('/user', userRoutes)

// app.get("/", (req, res) => {
//     res.status(201).json({ message: "Connected to Backend!" });
// });

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
})

// const CONNECTION_URL = process.env.MONGODB_DATABASE_URL
const CONNECTION_URL = 'mongodb+srv://A158_Debug:bJYBjlQz3QtLDPbR@cluster0.zaeyu.mongodb.net/test';
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`App is Listening on PORT:${PORT}`)))
    .catch((error) => console.log(error))

