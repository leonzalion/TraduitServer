require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://traduit:${process.env.DB_PASSWORD}@traduit-guxow.mongodb.net/test`);

const app = express();
app.use(bodyParser.json());

const createGroup = require('./controllers/groups/create');
app.post('/groups', createGroup);

const joinGroup = require('./controllers/groups/join');
app.post('/groups/join', joinGroup);

const registerUser = require('./controllers/users/register');
app.post('/users', registerUser);

const loginUser = require('./controllers/users/login');
app.get('/users', loginUser);

app.listen(port, () => console.log(`Listening on part ${port}`));