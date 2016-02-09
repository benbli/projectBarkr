console.log('playdateApi loaded');
var express = require('express');
var router = express.Router();

var Playdate = require('../../models/playdate.js');

// HEADER SETTINGS
  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT");
    next();
  });


    // GET ALL
    router.get('/', function(req, res){
      Playdate.find({}, function(err, dbPlaydates) {
        res.json({playdates: dbPlaydates});
      });
    });

    // POST
    router.post('/', function(req, res, next) {
      console.log('creating playdate!');
      if (!req.body.playdate) { return next({status:422, message: 'Missing arguments' }); }
      Playdate.create(req.body.playdate, function(err, playdate){
        res.json(playdate);
      });
    });


    module.exports = router;
