var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
    q: '#twitterbot',
    count: 5,
    result_type: 'recent',
    lang: 'en'
};

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

// Initiate your search using the above paramaters
let favTwit = () => {
    T.get('search/tweets', params, function(err, data, response) {
        // If there is no error, proceed
        if(!err){
            // Loop through the returned tweets
            for(let i = 0; i < data.statuses.length; i++){
                // Get the tweet Id from the returned data
                let id = { id: data.statuses[i].id_str }
                // Try to Favorite the selected Tweet
                T.post('favorites/create', id, function(err, response){
                    // If the favorite fails, log the error message
                    if(err){
                        console.log(err[0].message);
                    }
                    // If the favorite is successful, log the url of the tweet
                    else{
                        let username = response.user.screen_name;
                        let tweetId = response.id_str;
                        console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
                    }
                });
            }
        } else {
            console.log(err);
        }
    });
};



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

tweetIt();
setInterval(tweetIt, 1000*60);
setInterval(favTwit, 1000*60*60);


