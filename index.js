const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const db = require('./queries')

app.listen(3000, () => {
    console.log("App listening on port 3000")
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/create_record', db.createRecord);
app.get('/records/hour', db.getRecordsByHour);
app.get('/records/day', db.getRecordsByDay);