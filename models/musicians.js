let crud = require('./crud');

function add_musician(j) {
    let a = [ j.name, j.age, j.gender, j.ph ];
    let q = `insert into musicians (name, age, gender, ph)
             values (?, ?, ?, ?);`;

    crud.insert(q, a);
}

async function all_musicians (cb) {
    let q = `select musician_id, name, age, gender, ph
             from musicians`;
    cb(await crud.get_all(q));
}

async function get_musician(id, cb) {
    let q = `select musician_id, name, age, gender, ph
             from musicians
             where musician_id = ?`;

    cb(await crud.get_one(q, [id]));
}

function update_musician(id, j) {
    let a = [ j.name, j.age, j.gender, j.ph, id];
    let q = `update musicians
             set name = ?,
             age = ?,
             gender = ?,
             ph = ?
             where musician_id = ?`;

    crud.update(q, a);
}

function delete_musician(id) {
    let q = `delete from musicians
             where musician_id = ?`;

    crud.del(q, [id]);
}

module.exports = { add_musician,
                   all_musicians,
                   get_musician,
                   update_musician,
                   delete_musician
                 };
