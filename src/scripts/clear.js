const { connect } = require('../database.js');
const db = connect();

const HAMSTERS = 'hamsters'



async function clear() {
    const hamstersRef = db.collection(HAMSTERS)
    const hamstersSnapshot = await hamstersRef.get()

    if( hamstersSnapshot.empty ) {
        return
    }

    hamstersSnapshot.forEach(docRef => {
        hamstersRef.doc(docRef.id).delete()
    })
}

clear();