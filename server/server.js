const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


const users = require('./routes/api/users');
const articles = require('./routes/api/articles');
const { checkToken } = require('./middleware/auth');

// mongodb+srv://admin:<password>@cluster0.cz0j2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
const mongoUri = 'mongodb+srv://admin:admin@cluster0.cz0j2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})


app.use(bodyParser.json())
app.use(checkToken)
app.use("/api/users",users)
app.use("/api/articles",articles)

const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})