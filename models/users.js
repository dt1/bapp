let crud = require('./crud');

function insertUser (uname, pwd) {
    let q = `insert into usr(uname, pwd)
             values (?, ?);`;

    crud.insert(q, [uname, pwd]);
}

async function selectUser (cb) {
    let q = `select uid, uname, pwd from usr`;

    console.log('select');

    cb(await crud.get_all(q));
}

async function getUser (j, cb) {
    let a = [ j.uname ];
    let q = `select uid, uname, pwd from usr
             where uname = ?`;

    cb(await crud.get_one(q, a));
}

function deleteUsers () {
    let q = `delete from usr`;

    crud.del_all(q);
}

async function checkUser(cb) {
    let q = `select count(*) as cnt from usr`;

    cb(await crud.get_all(q));
}


// delete_users();


module.exports = { selectUser,
                   getUser,
                   insertUser,
                   checkUser,
                 };
