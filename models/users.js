let crud = require('./crud');

function insert_user (uname, pwd) {
    let q = `insert into usr(uname, pwd)
             values (?, ?);`;

    crud.insert(q, [uname, pwd]);
}

async function select_user (cb) {
    let q = `select uid, uname, pwd from usr`;

    cb(await crud.get_all(q));
}

async function get_user (j, cb) {
    let a = [ j.uname ];
    let q = `select uid, uname, pwd from usr
             where uname = ?`;

    cb(await crud.get_one(q, a));
}

function delete_users () {
    let q = `delete from usr`;

    crud.del_all(q);
}

// delete_users();


module.exports = { select_user,
                   get_user,
                   insert_user
                 };
