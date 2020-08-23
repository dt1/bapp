let crud = require('./crud');

function add_instrument(j) {
    let a = [ j.name, j.type, j.price ];
    let q = `insert into instruments (name, type, price)
             values (?, ?, ?);`;

    crud.insert(q, a);
}

async function all_instruments (cb) {
    console.log("iiii");
    let q = `select instrument_id, name, type, price
             from instruments`;
    cb(await crud.get_all(q));
}

async function get_instrument(id, cb) {
    let q = `select instrument_id, name, type, price
             from instruments
             where instrument_id = ?`;

    cb(await crud.get_one(q, [id]));
}

function update_instrument(id, j) {
    let a = [ j.name, j.type, j.price, id];
    let q = `update instruments
             set name = ?,
             type = ?,
             price = ?
             where instrument_id = ?`;

    console.log("www");

    crud.update(q, a);
}

function delete_instrument(id) {
    let q = `delete from instruments
             where instrument_id = ?`;

    crud.del(q, [id]);
}

module.exports = { add_instrument,
                   all_instruments,
                   get_instrument,
                   update_instrument,
                   delete_instrument
                 };
