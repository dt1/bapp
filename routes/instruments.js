var express = require('express');
var router = express.Router();

var crud = require('../models/instruments');
var auth = require('./auth');

const util = require('util')

router.get('/', auth.redirectLogin, function(req, res, next) {
    crud.all_instruments((d) => {
        res.render('instruments', { instruments: d });
    });
});

router.post('/', auth.redirectLogin, function(req, res, next) {
    crud.add_instrument(req.body);
    res.redirect('/instruments');
});

router.get('/:id', auth.redirectLogin, function(req, res) {
    let id = req.params.id;
    crud.get_instrument(id, (d) => {
        res.render('edit-instrument', { info: d });
    });
});

router.post('/:id', auth.redirectLogin, function(req, res) {
    let id = req.params.id;
    crud.update_instrument(id, req.body);
    res.redirect('/instruments');
});

router.post('/delete/:id', auth.redirectLogin, function(req, res) {
    let id = req.params.id;
    crud.delete_instrument(id);
    res.redirect('/instruments');
});



module.exports = router;
