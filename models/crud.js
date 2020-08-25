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

function get_some(q, a) {
    return new Promise((resolve, reject) => {
        db.all(q, a, (err, rows) => {
            if (err) {
                console.log(err);
            }
            resolve(rows);
        });
    });
}

function update(q, a) {
    console.log("q == " + q);
    console.log("a == " + a);
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


module.exports = { get_all,
                   get_some,
                   get_one,
                   update,
                   insert,
                   del,
                   del_all
                 };
