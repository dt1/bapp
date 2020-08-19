var express = require('express');
var router = express.Router();

var crud = require('../models/crud');

/* GET home page. */
router.get('/', function(req, res, next) {
    crud.select_user((d) => {
        res.render('index', { users: d });
    });
});

router.get('/create-account', function(req, res) {
    res.render('create-account');
});

module.exports = router;
