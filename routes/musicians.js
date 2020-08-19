var express = require('express');
var router = express.Router();

var crud = require('../models/musicians');

const util = require('util')

router.get('/', function(req, res, next) {
    crud.all_musicians((d) => {
        res.render('musicians', { musicians: d });
    });
});

router.post('/', function(req, res, next) {
    crud.add_musician(req.body);
    res.redirect('/musicians');
});

router.get('/:id', function(req, res) {
    let id = req.params.id;
    crud.get_musician(id, (d) => {
        res.render('edit-musician', { info: d });
    });
});

router.post('/:id', function(req, res) {
    let id = req.params.id;
    crud.update_musician(id, req.body);
    res.redirect('/musicians');
});

router.post('/delete/:id', function(req, res) {
    let id = req.params.id;
    crud.delete_musician(id);
    res.redirect('/musicians');
});



module.exports = router;
