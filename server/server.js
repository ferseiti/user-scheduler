const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');
const app = express();

const CONFIG = require('./config.json');

app.use(cors());
app.use(express.json());

var dbPort = CONFIG.dbPort;
var dbHost = CONFIG.dbHost;
var dbName = CONFIG.dbName;

var mongodb = `mongodb://${dbHost}:${dbPort}/${dbName}`

mongoose.set('useFindAndModify', false);
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We're connected to MongoDB!");
});

app.use('/', eventRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));