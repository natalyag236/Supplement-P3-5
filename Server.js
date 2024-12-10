const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const DataModel = require('./models/DataModel'); 

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  const { content, ...otherFields } = req.body;

  try {
    fs.writeFileSync('output.txt', content);
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