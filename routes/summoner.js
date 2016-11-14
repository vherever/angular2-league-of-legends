var express = require('express');
var router = express.Router();
var LolApi = require('leagueapi');
var app = {
    key: process.env.APP_KEY
};

router.post('/summoner', function (req, res, next) {
    LolApi.init(app.key, 'euw');
    var val = req.body.title;
    LolApi.Summoner.getByName(val, function(err, summoner) {
        if(!err) {
            res.send(summoner);
        }
    });
});

module.exports = router;