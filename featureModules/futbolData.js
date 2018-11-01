const Twitter = require('twitter');
const config = require('../config.js');
const T = new Twitter(config);
const fetch = require('node-fetch');
const moment = require('moment');

let futbolData = () => {
    let isToday = moment().format('YYYY-MM-DD');
    let dateLimit = moment().add(1, 'day').format('YYYY-MM-DD');
    let resultsArr = [];

    fetch(`https://apifootball.com/api/?action=get_events&from=2018-10-27&to=2018-10-28&league_id=63&APIkey=${config.football_apiKey}`)
        .then(res => res.json())
        .then(json => {
            json.map(i => {
                resultsArr.push({home: i.match_hometeam_name, away: i.match_awayteam_name, homeGoals: i.match_hometeam_score, awayGoals: i.match_awayteam_score});
            });

            let isTweeted = () => {
                resultsArr.map(i => {
                    console.log(`Result ${i.home} ${i.homeGoals} - ${i.awayGoals} ${i.away}`);
                });
            };
            isTweeted();
        })
        .catch(err => console.log("ERRORRR!!", err));
};

module.exports = futbolData;