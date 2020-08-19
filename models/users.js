let db = require('./conn');

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


        // res = []

        // rows.forEach((row) => {
        //     console.log(`uu = ${row.uid} - ${row.uname} - ${row.pwd}`);
        //     res.push(row.uid, row.uname, row.pwd);
        // });
        // console.log("rr = " + res);
        // return res;

// async function q_select_user () {
//     await db.all(select_usr, (err, rows).then((rows) => {
//         return rows;
//     }))
// }

        // res = []

        // rows.forEach((row) => {
        //     console.log(`uu = ${row.uid} - ${row.uname} - ${row.pwd}`);
        //     res.push(row.uid, row.uname, row.pwd);
        // });
        // console.log("rr = " + res);
        // return res;
//     });
// }

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


module.exports = { select_user
                 };
