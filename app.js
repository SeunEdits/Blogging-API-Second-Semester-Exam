const express = require('express');
const dotenv = require('dotenv');
const database = require('./config/database');
const blogsRouter = require('./Blogs/blogs.router');
const authRouter = require('./users/users.router');

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

database.connectDB();

app.use(express.json()); //parse json body

app.get('/', (req, res) => {
    res.send('Welcome to UniBlog');
})

app.get('/health', (req, res) => {
    res.send('Ok');
})

app.use('/auth', authRouter)
app.use('/blogs', blogsRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})