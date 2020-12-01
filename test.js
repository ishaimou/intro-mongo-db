const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');

const app = express();
const PORT = 3000;

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    minlength: 10,
  },
});

const Note = mongoose.model('note', noteSchema);

app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/note', async (req, res) => {
  const notes = await Note.find({}).lean().exec();
  res.status(200).json(notes);
});

app.post('/note', async (req, res) => {
  const newNote = req.body;
  console.log(newNote);
  try {
    const note = await Note.create(newNote);
    res.status(201).json(note.toJSON());
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
});

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
  });
};

connect()
  .then(async (connection) => {
    app.listen(PORT, () => {
      console.log('server running on port', PORT);
    });
  })
  .catch((e) => console.error(e));
