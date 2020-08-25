var express = require('express');
var router = express.Router();

var iCrud = require('../models/instruments');
var mCrud = require('../models/musicians');
var miCrud = require('../models/musicians-instrument');
var auth = require('./auth');

var async = require('async');

const util = require('util')

router.get('/', auth.redirectLogin, function(req, res, next) {
    slug = {}
    async.parallel([
        function(cb) {
            mCrud.all_musicians((m) => {
                slug.musicians = m;
                cb();
            })

        },

        function(cb) {
            iCrud.available_instruments((i) => {
                slug.instruments = i;
                cb();
            })
        }
    ], function(err, results) {
        if(err) {
            return next(err);
        }
        res.render('combine-mi', {slug: slug});
    })

});


router.post('/', auth.redirectLogin, function(req, res, next) {
    miCrud.add_mi(req.body);
    res.redirect('/musicians');
});

module.exports = router;
