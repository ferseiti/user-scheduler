const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');
const app = express();

const CONFIG = require('/etc/secrets/config.json');

var corsOptions = {
    origin: ["https://user-scheduler-client.onrender.com","189.46.23.213"]
    }

app.use(cors(corsOptions));
app.use(express.json());

// var dbPort = CONFIG.dbPort;
var dbHost = CONFIG.dbHost;
var dbName = CONFIG.dbName;
var dbUser = CONFIG.dbUser;
var dbPass = CONFIG.dbPass;

var serverPort = 5000;
var serverHost = '0.0.0.0';

// var mongodb = `mongodb://${dbHost}:${dbPort}/${dbName}`
var mongouri = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}`

// mongoose.set('useFindAndModify', false);
// mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(mongouri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We're connected to MongoDB!");
});

app.use('/', eventRoutes);

app.listen(serverPort, serverHost, () => console.log('Server started on port ' + serverPort));