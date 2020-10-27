const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();



const uri = "mongodb+srv://shaker:nfshaker258@cluster0.h3esh.mongodb.net/doctor-portal?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const appointmentsCollection = client.db("doctor-portal").collection("appointment");
    app.post('/addAppointment', (req, res) => {
        const appointments = req.body;
        console.log(appointments);
        appointmentsCollection.insertOne(appointments)
        .then(result => {
            res.send(result.insertedCount > 0);
        })
    })

    app.post('/appointmentByDate', (req, res) => {
        const date = req.body;
        console.log(date.date);
        appointmentsCollection.find({date: date.date})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })
});


app.get('/', (req, res) => {
    res.send('hello from db world!');
})

app.listen(process.env.PORT || port)