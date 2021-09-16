const express = require('express')
const { connect } = require('../database.js');
const db = connect();

const HAMSTERS = 'hamsters'

const app = express()
const PORT = process.env.PORT || 1337


//hamsters = []

app.get('/hamsters', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
})