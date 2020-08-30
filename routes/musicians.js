var express = require('express');
var router = express.Router();

var crud = require('../models/musicians');
var mitCrud = require('../models/mi-types');
var auth = require('./auth');

var async = require('async');

const util = require('util')

router.get('/', auth.redirectLogin, function(req, res, next) {
    slug = {};
    async.parallel([
        function(cb) {
            crud.musician_instruments((m) => {
                slug.musician = m;
                cb();
            });
        },

        function(cb) {
            mitCrud.all_mtypes((t) => {
                slug.mtypes = t;
                cb();
            });
        }
    ], function(err, results) {
        if(err) {
            return next(err);
        }
        res.render('musicians', { slug: slug });
    });
});

router.post('/', auth.redirectLogin, function(req, res, next) {
    crud.add_musician(req.body);
    res.redirect('/musicians');
});

router.get('/:id', auth.redirectLogin, function(req, res) {
    let id = req.params.id;
    slug = {}
    async.parallel([
        function(cb) {
            crud.get_musician(id, (m) => {
                slug.musician = m;
                cb();
            })
        },

        function(cb) {
            crud.specific_mi(id, (i) => {
                slug.instrument = i;
                cb();
            });
        },

        function(cb) {
            mitCrud.all_mtypes((t) => {
                slug.mtypes = t;
                cb();
            });
        }

    ], function(err, results) {
        if(err) {
            return next(err);
        }
        res.render('edit-musician', {slug: slug})
    })
});

router.post('/:id', auth.redirectLogin, function(req, res) {
    let id = req.params.id;
    crud.update_musician(id, req.body);
    res.redirect('/musicians');
});

router.post('/delete/:id', auth.redirectLogin, function(req, res) {
    let id = req.params.id;
    crud.delete_musician(id);
    res.redirect('/musicians');
});

router.post('/delete-instrument/:mid-:iid', auth.redirectLogin, function(req, res) {
    let p = req.params;
    crud.del_mi(req.params);
    res.redirect('/musicians');
});



module.exports = router;
