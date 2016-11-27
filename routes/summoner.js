var express = require('express');
var router = express.Router();
var LolApi = require('leagueapi');
var app = {
    key: process.env.APP_KEY
};
LolApi.init(app.key, 'euw');
router.get('/getApiVersion', function (req, res, next) {
    var val = req.body.region;
    LolApi.Static.getVersions('euw', function(err, info) {
        if(!err) {
            res.send(info);
        }
    });
});

router.get('/getRegions', function (req, res, next) {
    LolApi.getShards(function (err, regions) {
        if(!err) {
            res.send(regions);
        }
    });
});

router.post('/summoner', function (req, res, next) {
    var val = req.body.summoner;
    var val2 = req.body.region;
    LolApi.Summoner.getByName(val, val2, function(err, summoner) {
        if(!err) {
            res.send(summoner);
        }
        else {
            res.send({error: 'Wooops! This summoner is not exist. Please try another'});
        }
    });
});

router.post('/getPlayerSummary', function (req, res, next) {
    var val = {
        summonerId: req.body.summonerId,
        season: req.body.season,
        region: req.body.summonerId
    };
    LolApi.Stats.getPlayerSummary(val.summonerId, val.region, function (err, data) {
        if(!err) {
            res.send(data);
        } else {
            res.send({error: 'error loading player summary'});
        }
    });
});

router.post('/getRecentGames', function (req, res, next) {
    var val = {
        summonerId: req.body.summonerId
    };
    LolApi.getRecentGames(val.summonerId, function (err, data) {
        if(!err) {
            res.send(data);
        } else {
            res.send({error: 'error loading recent games'});
        }
    })
});

module.exports = router;