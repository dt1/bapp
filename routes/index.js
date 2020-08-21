var express = require('express');
var router = express.Router();

var users = require('../models/users');
var auth = require('./auth');

router.get('/', auth.redirectMuse, function(req, res, next) {
    console.log(req.session);
    users.select_user((d) => {
        auth.newAcct(d, res);
        res.render('index', { users: d });
    });
});

router.post('/', function(req, res, next) {
    users.get_user(req.body, (d) => {
        auth.login(d, req, res);
        console.log(req.body);
    });
    // login(1, req, res);

});

router.get('/create-account', function(req, res) {
    res.render('create-account');
});

router.post('/create-account', function(req, res) {
    create_acct(req);
    res.redirect('/');
});

router.post('/logout', auth.redirectLogin, function(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

module.exports = router;
