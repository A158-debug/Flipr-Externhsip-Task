const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { fileURLToPath } = require('url');

require('dotenv').config();

const userRoutes = require('./routes/user.js');
const postsRoutes = require('./routes/posts.js');

const app = express();
const PORT = process.env.PORT || 8080;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: '*', credentials: true }));

// For production level
app.use(express.static(path.join(__dirname, './client/build')));

app.use('/posts', postsRoutes);
app.use('/user', userRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const CONNECTION_URL = process.env.MONGODB_DATABASE_URL;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`App is Listening on PORT:${PORT}`)))
    .catch((error) => console.log(error));
