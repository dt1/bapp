var express = require('express');
var router = express.Router();

var crud = require('../models/musicians');
var auth = require('./auth');

const util = require('util')

router.get('/', auth.redirectLogin, function(req, res, next) {
    crud.musician_instruments((d) => {
        res.render('musicians', { slug: d });
    });
});

router.post('/', auth.redirectLogin, function(req, res, next) {
    crud.add_musician(req.body);
    res.redirect('/musicians');
});

router.get('/:id', auth.redirectLogin, function(req, res) {
    let id = req.params.id;
    crud.get_musician(id, (d) => {
        res.render('edit-musician', { info: d });
    });
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



module.exports = router;
