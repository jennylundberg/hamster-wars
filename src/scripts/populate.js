const { connect } = require('../database.js')
const db = connect();

const HAMSTERS = 'hamsters'
const data = require('../assets/data.json')




populate();

async function populate() {
    data.forEach(object => {
        db.collection(HAMSTERS).add(object)
    })
}