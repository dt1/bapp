var express = require('express');
var router = express.Router();

var mitCrud = require('../models/mi-types');
var auth = require('./auth');

var async = require('async');

const util = require('util')

router.get('/', auth.redirectLogin, function(req, res, next) {
    slug = {}
    async.parallel([
        function(cb) {
            mitCrud.all_mtypes((m) => {
                slug.musicians = m;
                cb();
            })

        },

        function(cb) {
            mitCrud.all_itypes((i) => {
                slug.instruments = i;
                cb();
            })
        }
    ], function(err, results) {
        if(err) {
            return next(err);
        }
        res.render('mi-types', {slug: slug});
    })

});

router.post('/add-muse', auth.redirectLogin, function(req, res, next) {
    console.log("adm");
    mitCrud.add_mtype(req.body);
    res.redirect('/mi-types');
});

router.post('/add-instrument', auth.redirectLogin, function(req, res, next) {
    mitCrud.add_itype(req.body);
    res.redirect('/mi-types');
});

router.post('/delete-muse-:mtype', auth.redirectLogin, function(req, res, next) {
    let mtype = req.params.mtype;
    mitCrud.del_mtype(mtype);
    res.redirect('/mi-types');
});

router.post('/delete-instrument-:itype', auth.redirectLogin, function(req, res, next) {
    let itype = req.params.itype;
    mitCrud.del_itype(itype);
    res.redirect('/mi-types');
});



module.exports = router;
