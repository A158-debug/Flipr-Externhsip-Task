import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'

import userRoutes from './routes/user.js'
import postsRoutes from './routes/posts.js'

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());


app.use('/posts',postsRoutes)
app.use('/user',userRoutes)

app.get('/',(req,res) => {
    res.send(`App is running`)
})

const CONNECTION_URL = process.env.MONGODB_DATABASE_URL;

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT,()=>console.log(`server is running on localhost:${PORT}`)))
.catch((error)=>console.log(error))

