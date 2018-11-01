const Twitter = require('twitter');
const config = require('../config.js');
const T = new Twitter(config);

let twitData = [
    { status: 'Paredes no fracasó.' },
    { status: 'Yeites!' },
    { status: 'Tonz?' },
    { status: 'Sale ese pudin?' },
    { status: 'Sale ese Colala?' },
    { status: 'En esta isla solo se escucha rock n roll' },
    { status: 'En mi empresa NADIE come pudin' },
    { status: 'ONE PER DAY' },
    { status: 'Ya pidieron a la K?' },
    { status: 'Vamos al Alien' },
    { status: 'Ping Pao de alto vuelo' },
    { status: 'git commit rompo todo' },
    { status: 'Cuidado con the rockkk' },
    { status: 'DEJEN de joder con el cokemon' },
    { status: 'Usted se tiene que arrepentir de lo que dijo...' }
];

let tweetIt = () => {
    let randomTwit = twitData[Math.floor(Math.random() * twitData.length)];
    let isTweeted = (err, data, res) => {
        if(err){
            console.log('Error! ', err);
        } else {
            console.log(`Shit has been twitted: ${randomTwit.status}`);
        }
    };
    T.post('statuses/update', randomTwit, isTweeted);
};

module.exports = tweetIt;