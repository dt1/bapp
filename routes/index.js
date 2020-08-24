var express = require('express');
var router = express.Router();

var users = require('../models/users');
var auth = require('./auth');

function newAcct(cb) {
    users.checkUser((d) => {
        if (d[0]["cnt"] == 0) {
            cb(false);
        } else {
            cb(true);
        }
    });
}

router.get('/', auth.redirectMuse, function(req, res, next) {
    newAcct((tf) => {
        if (tf) {
            res.render('index');
        } else {
            res.redirect('/create-account');
        }
    });
});

router.post('/', function(req, res, next) {
    users.getUser(req.body, (d) => {
        auth.login(d, req, res);
    });
});

router.get('/create-account', function(req, res) {
    res.render('create-account');
});

router.post('/create-account', function(req, res) {
    auth.createAcct(req)
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


// password
