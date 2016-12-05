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
        } else {
            res.send({error: err.message});
        }
    });
});

router.get('/getRegions', function (req, res, next) {
    LolApi.getShards(function (err, regions) {
        if(!err) {
            res.send(regions);
        } else {
            res.send({error: err.message});
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
            res.send({error: err.message});
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
            res.send({error: err.message});
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
            res.send({error: err.message});
        }
    })
});

router.post('/getLeagueEntryData', function (req, res, next) {
    var val = {
        summonerId: req.body.summonerId
    };
    LolApi.getLeagueEntryData(val.summonerId, function (err, data) {
        if(!err) {
            res.send(data);
        } else {
            res.send({error: err.message});
        }
    })
});

router.post('/getMatchHistory', function (req, res, next) {
    var val = {
        summonerId: req.body.summonerId,
        region: req.body.summonerId
    };
    // var options = {beginIndex: 1, endIndex: 31};

    LolApi.getMatchHistory(val.summonerId, val.region, function (err, data) {
        if(!err) {
            res.send(data);
        } else {
            res.send({error: err.message});
        }
    })
});

// router.post('/getChampionById', function (req, res, next) {
//     var val = {
//         championId: req.body.championId,
//         region: req.body.region
//     };
//
//     LolApi.Static.getChampionById(val.championId, val.region, function (err, data) {
//         if(!err) {
//             res.send(data);
//         } else {
//             res.send({error: 'error loading champion data'});
//         }
//     })
// });

router.post('/getChampionList', function (req, res, next) {
    var val = {
        region: req.body.region
    };

    LolApi.Static.getChampionList(val.region, function (err, data) {
        if(!err) {
            res.send(data);
        } else {
            res.send({error: err.message});
        }
    })
});

module.exports = router;