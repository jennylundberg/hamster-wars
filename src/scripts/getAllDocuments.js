const { arrayBuffer } = require('stream/consumers');
const { getHeapSnapshot } = require('v8');
const database = require('../database.js');
const connect = database.connect;
const db = connect();

const HAMSTERS = 'hamsters'

getAll();

async function getAll() {
    console.log('Retrieving all documents from database...');

    const hamstersRef = db.collection('HAMSTERS')

    const hamstersSnapshot = await hamstersRef.get()

    if ( hamstersSnapshot.empty ) {
        console.log('No documents in collection.')
        return
    }

    await hamstersSnapshot.forEach( async docRef => {
        const data = await docRef.data()
        data.id = docRef.id
        array.push(data)
    })

    console.log('Data fromdatabase', array)
}

