var express = require('express');
var router = express.Router();
var LolApi = require('leagueapi');
var app = {
    key: process.env.APP_KEY
};
LolApi.init(app.key, 'euw');
router.get('/getApiVersion', function (req, res, next) {
    LolApi.Static.getVersions('euw', function(err, info) {
        if(!err) {
            res.send(info);
        }
    });
});

router.post('/summoner', function (req, res, next) {
    var val = req.body.title;
    LolApi.Summoner.getByName(val, function(err, summoner) {
        if(!err) {
            res.send(summoner);
        }
        else {
            res.send({error: 'Wooops! This summoner is not exist. Please try another'});
        }
    });
});

module.exports = router;