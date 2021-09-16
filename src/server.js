const express = require('express')

const HAMSTERS = 'hamsters'

const app = express()
const PORT = process.env.PORT || 1337

//hamsters = []

//Middleware
app.use("/", express.static(__dirname + "/frontend"))

//Logger

app.get('/hamsters', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
})