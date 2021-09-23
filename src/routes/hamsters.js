
const express = require('express');
const router = express.Router();

const database = require('../database.js')
const connect = database.connect
const db = connect();

const HAMSTERS = 'hamsters'
const allowed = ['name', 'age', 'favFood', 'loves', 'imgName', 'wins', 'defeats', 'games']

// GET / hamsters
router.get('/', async (req, res) => {
    let array = await getAll()
    res.send(array).status(200)
})

async function getAll() {
    const hamstersRef = db.collection(HAMSTERS)
    const hamstersSnapshot = await hamstersRef.get()

    if (hamstersSnapshot.empty) {
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
// GET cutest hamster
router.get('/cutest', async (req, res) => {
    let cutest = await cutestHamster()
    res.send(cutest).status(200)
})

// GET random hamsters

router.get('/random', async (req, res) => {
    let randomHamster = await getRandom()
    res.send(randomHamster).status(200)
})

async function getRandom() {
    let array = await getAll()
    return array[Math.floor(Math.random() * array.length)]
}

// GET specifik hamster med id
router.get('/:id', async (req, res) => {
    const docRef = db.collection(HAMSTERS).doc(req.params.id)
    const docSnapshot = await docRef.get()
    if (!docSnapshot.exists) {
        res.sendStatus(404)
        return
    }

    res.send(await docSnapshot.data()).status(200)

})



// POST lägg till en ny hamster som får ett id i databasen
function okHamsterObj(maybe) {
    if ((typeof maybe) !== 'object') {
        return false
    }
    let keys = Object.keys(maybe)
    let counter = 0;

    for (i = 0; i < allowed.length; i++) {
        if (keys.includes(allowed[i])) {
            counter++
        }
    }

    return counter === 8
}


router.post('/', async (req, res) => {
    if (!okHamsterObj(req.body)) {
        res.status(400).send('Have to be a valid object...')
        return
    }

    db.collection(HAMSTERS).add(req.body)
        .then(function (docRef) {
            let obj = {
                id: `${docRef.id}`
            }
            res.status(200).send(obj)
        })
})

// PUT ändra i ett hamster object

router.put('/:id', async (req, res) => {
    const docRef = db.collection(HAMSTERS).doc(req.params.id)
    const docSnapshot = await docRef.get()
    let keys = Object.keys(req.body)

    if (!docSnapshot.exists) {
        res.sendStatus(404)
        return
    }

    if (keys.length === 0) {
        res.sendStatus(400)
        return
    }

    //kontrollera att body är okej
    for (key of keys) {
        if (!allowed.includes(key)) {
            res.sendStatus(400)
            return
        }
    }

    //skicka ändringar till databasen
    await docRef.update(req.body)
    res.sendStatus(200)
    //response: statuskod
})

// DELETE hamster ska tas bort med hjälp av id
router.delete('/:id', async (req, res) => {
    const docRef = db.collection(HAMSTERS).doc(req.params.id)
    const docSnapshot = await docRef.get()

    if (!docSnapshot.exists) {
        res.sendStatus(404)
        return
    }

    docRef.delete(req.body)
    res.sendStatus(200)
})



// GET cutest hamster
async function cutestHamster() {
    let array = await getAll()
    let score = 0;
    let topScore = []

    for(i = 0; i < array.length; i++) {
        let cuteScore = array[i].wins - array[i].defeats
        if (cuteScore > score) {
            score = cuteScore
            topScore = []
            topScore.push(array[i])
        } else if (cuteScore === score) {
            topScore.push(array[i])
        }
        
    }

    return topScore
}




module.exports = router

