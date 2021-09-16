const { connect } = require('../database.js')
const db = connect();

const HAMSTERS = 'hamsters'

addOne();

async function addOne() {
    console.log('Adding a new document...');
    const object = {
        name, age, favFood, loves, imgName, wins, defeats, games
    }
}