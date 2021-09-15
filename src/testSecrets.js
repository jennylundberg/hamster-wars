const secrets = require('./secrets/secret.json')

if ( secrets ) {
    console.log(`We found secrets!
    password=${secrets.password}, 
    message=${secrets.message}.`);
} else {
    console.log('No secrets :/');
}