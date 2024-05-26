const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');
const app = express();

const CONFIG = require('/etc/secrets/config.json');

app.use(cors());
app.use(express.json());

var dbPort = CONFIG.dbPort;
var dbHost = CONFIG.dbHost;
var dbName = CONFIG.dbName;

var serverPort = 5000;
var serverHost = '0.0.0.0';

// var mongodb = `mongodb://${dbHost}:${dbPort}/${dbName}`
var mongouri = `mongodb+srv://${dbHost}:${dbPass}@${dbHost}`

mongoose.set('useFindAndModify', false);
// mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(mongouri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We're connected to MongoDB!");
});

app.use('/', eventRoutes);

app.listen(serverPort, serverHost, () => console.log('Server started on port ' + serverPort));