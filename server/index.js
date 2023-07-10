import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'

import userRoutes from './routes/user.js'
import postsRoutes from './routes/posts.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

// app.use(cors({ origin: '*', credentials: true, }))
// app.use(cors({
//     origin: (origin, callback) => {
//       if (origin === 'http://localhost:3000' || origin === 'https://connectify-rho.vercel.app') {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     }
//   }));


app.use('/posts', postsRoutes)
app.use('/user', userRoutes)

app.get("/", (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
});

// const CONNECTION_URL = process.env.MONGODB_DATABASE_URL
const CONNECTION_URL = "mongodb+srv://A158_Debug:xtey3CIJlVbjY4Ry@cluster0.zaeyu.mongodb.net/test"

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`App is Listening on PORT:${PORT}`)))
    .catch((error) => console.log(error))

