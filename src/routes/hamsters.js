
const express = require('express')
const router = express.Router();

const database = require('../database.js')
const connect = database.connect
const db = connect();

const HAMSTERS = 'hamsters'

// GET / hamsters
router.get('/', async (req, res) => {
    let array = await getAll()
    res.send(array)
})

async function getAll() {
    const hamstersRef = db.collection(HAMSTERS)
    const hamstersSnapshot = await hamstersRef.get()

    if( hamstersSnapshot.empty ) {
        return []
    }

    const array = []
    await hamstersSnapshot.forEach(async docRef => {
        const data = await docRef.data()
        data.id = docRef.id
        array.push(data)
    })
    return array
}

module.exports = router

