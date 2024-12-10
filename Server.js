const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const DataModel = require('./models/DataModel'); 

const app = express();
app.use(express.json());
/** 
* POST /
* Handles incoming JSON payloads and performs the following:
* 1. Extracts `content` and other fields from the request body.
* 2. Writes the `content` to a file named `output.txt`.
* 3. Saves the entire JSON payload to the MongoDB database.
*/
app.post('/', async (req, res) => {
  const { content, ...otherFields } = req.body;

  try {

   } catch (error) {
    console.error('Error writing to file:', error);
    return res.status(500).send('Error writing to file');
  }

  try {
    const newData = new DataModel({ content, ...otherFields });
    await newData.save();
  } catch (error) {
    console.error('Error saving to the database:', error);
    return res.status(500).send('Error saving to the database');
  }

  res.status(200).json({ content });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;