var express = require('express');
var router = express.Router();

var users = require('../models/users');
var auth = require('./auth');

// const newAcct = (req, res, next) => {
//     users.checkUser((d) => {
//         if (d[0]["cnt"] == 0) {
//             console.log("???");
//             res.redirect('/create-account');
//         } else {
//             console.log(222);
//             res.render('index');
//         }
//     });
// }

function newAcct(cb) {
    users.checkUser((d) => {
        console.log("d " + d[0]["cnt"]);
        if (d[0]["cnt"] == 0) {
            cb(false);
        } else {
            cb(true);
        }
    });
}

router.get('/', auth.redirectMuse, function(req, res, next) {
    newAcct((tf) => {
        console.log("tf = " + tf);
        if (tf) {
            console.log("res t");
            res.render('index');
        } else {
            console.log("res f");
            res.redirect('/create-account');
        }
    });
});

router.post('/', function(req, res, next) {
    users.getUser(req.body, (d) => {
        auth.login(d, req, res);
        console.log(req.body);
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
