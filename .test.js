const request = require('supertest');
const app = require('./Server.js'); 
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const DataModel = require('./models/DataModel'); 
const { expect } = require('chai'); 

let mongoServer;
before(async function() {
  this.timeout(10000); 
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

after(async function() {
  this.timeout(10000); 
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('POST /', () => {
  it('should save content to file, database, and respond with the content', async function() {
    this.timeout(10000); 
    const content = 'Test content';
    const response = await request(app)
      .post('/')
      .send({ content, field1: 'value1', field2: 'value2' });

    expect(response.statusCode).to.equal(200);
    expect(response.body.content).to.equal(content);

    // Check the file was written
    const fileContent = fs.readFileSync('output.txt', 'utf8');
    expect(fileContent).to.equal(content);

    // Check the database for saved data
    const savedData = await DataModel.findOne({ content });
    expect(savedData).to.be.ok;
    expect(savedData.field1).to.equal('value1');
  });
});