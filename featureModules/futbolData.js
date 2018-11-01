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
                resultsArr.push({
                    country: `${i.country_name}'s`,
                    league: `EFL ${i.league_name}`,
                    home: i.match_hometeam_name,
                    away: i.match_awayteam_name,
                    homeGoals: i.match_hometeam_score,
                    awayGoals: i.match_awayteam_score,
                    twit: `${i.country_name} EFL ${i.league_name} Results => ${i.match_hometeam_name} ${i.match_hometeam_score} - ${i.match_awayteam_score} ${i.match_awayteam_name}. #${i.match_hometeam_name} #${i.match_awayteam_name} #EFL`
                });
            });

            let isTweeted = () => {
                resultsArr.map(i => {
                    //console.log(`Result ${i.home} ${i.homeGoals} - ${i.awayGoals} ${i.away}`);
                    console.log(i.twit);
                });
            };
            isTweeted();
        })
        .catch(err => console.log("ERROR HAS OCURRED!", err));
};

module.exports = futbolData;