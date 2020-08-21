let db = require('./conn');

function get_all(q) {
    return new Promise((resolve, reject) => {
        db.all(q, (err, rows) => {
            if (err) {
                console.log(err);
            }
            resolve(rows);
        });
    });
}

function get_one(q, a) {
    return new Promise((resolve, reject) => {
        db.get(q, a, (err, row) => {
            if (err) {
                console.log(err);
            }
            resolve(row);
        });
    });
}

function update(q, a) {
    db.run(q, a , (err) => {
        if (err) {
            console.log('updated err = ' + err);
        }
        console.log('table updated');
    });
}

function insert(q, a) {
    db.run(q, a, (err) => {
        if (err) {
            console.log('add row err = ' + err);
        }
        console.log('row inserted');
    });
}

function del(q, a) {
    db.run(q, a, (err) => {
        if (err) {
            console.log('deleted row err = ' + err);
        }
        console.log('row deleted');
    });
}

function del_all(q) {
    db.run(q, (err) => {
        if (err) {
            console.log('deleted all err = ' + err);
        }
        console.log('table cleared');
    });
}



let insert_usr = `
insert into usr(uname, pwd)
values (?, ?);`;

function insert_user () {
    db.run(insert_usr, ['fake-a', 'fake-pwd'], (err) => {
        if (err) {
            console.log('insert err = ' + err);
        }
        console.log(`new row w/ id: ${this.lastID}`);
    });
}

function select_user (cb) {
    let q = `select uid, uname, pwd from usr`;

    db.all(q, (err, rows) => {
        if (err) {
            console.log(err);
            cb(err);
            // return;
        }

        // console.log(rows);
        cb(rows);
    });
}

module.exports = { select_user,
                   get_all,
                   get_one,
                   update,
                   insert,
                   del,
                   del_all
                 };
