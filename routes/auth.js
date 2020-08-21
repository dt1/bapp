const bcrypt = require('bcrypt');
const saltRounds = 10;
const users = require('../models/users');

function login(d, req, res) {
    let loginPW = req.body.pwd;
    let loginUname = req.body.uname;
    let dbPW = d.pwd;
    let dbUname = d.uname;
    let userId = d.uid;
    bcrypt.compare(loginPW, dbPW, function(err, result) {
        if (result) {
            req.session.userid = userId;
            console.log("login = " + JSON.stringify(req.session));
            return res.redirect('/musicians');
        } else {
            res.redirect('/');
        }
    });
}

function redirectLogin (req, res, next) {
    console.log("req " + JSON.stringify(req.session));
    if (!req.session.userid) {
        res.redirect('/');
    } else {
        next();
    }
}

function redirectMuse (req, res, next) {
    if (req.session.userid) {
        res.redirect('/muscicians');
    } else {
        next();
    }
}

function createAcct(req) {
    let pwd = req.body.pwd;
    let uname = req.body.uname;
    bcrypt.hash(pwd, saltRounds, function(err, hash) {
        users.insertUser(uname, hash);
    });
}

const newAcct = (req, res, next) => {
    users.checkUser((d) => {
        if (d[0]["cnt"] == 0) {
            console.log("???");
            res.redirect('/create-account');
        } else {
            console.log(222);
            res.render('index');
        }
    });
}

module.exports = {
    newAcct,
    login,
    redirectLogin,
    createAcct,
    redirectMuse
};
