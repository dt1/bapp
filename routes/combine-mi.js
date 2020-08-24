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
            iCrud.all_instruments((i) => {
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
    res.redirect('/combine-mi');
});

// router.get('/:id', auth.redirectLogin, function(req, res) {
//     let id = req.params.id;
//     crud.get_instrument(id, (d) => {
//         res.render('edit-instrument', { info: d });
//     });
// });

// router.post('/:id', auth.redirectLogin, function(req, res) {
//     let id = req.params.id;
//     crud.update_instrument(id, req.body);
//     res.redirect('/instruments');
// });

// router.post('/delete/:id', auth.redirectLogin, function(req, res) {
//     let id = req.params.id;
//     crud.delete_instrument(id);
//     res.redirect('/instruments');
// });



module.exports = router;
