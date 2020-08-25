let crud = require('./crud');

function add_musician(j) {
    let a = [ j.name, j.age, j.gender, j.ph, j.price ];
    let q = `insert into musicians (name, age, gender, ph, price)
             values (?, ?, ?, ?, ?);`;

    crud.insert(q, a);
}

async function all_musicians(cb) {
    let q = `select musician_id, name, age, gender, ph, price
             from musicians`;
    cb(await crud.get_all(q));
}

async function musician_instruments(cb) {
    let q = `select m.musician_id, m.name, m.age, m.gender, m.ph, m.price,
                    group_concat(i.name, ', ') as instruments
             from musicians as m
             left join musician_instrument as mi
             using (musician_id)
             left join instruments as i
             using (instrument_id)
             group by m.musician_id, m.name, m.age, m.gender, m.ph, m.price`;

    cb(await crud.get_all(q));
}

async function specific_mi(id, cb) {
    let q = `select m.musician_id, i.instrument_id, i.name, i.type, i.price
             from musicians as m
             join musician_instrument as mi
             using (musician_id)
             join instruments as i
             using (instrument_id)
             where m.musician_id = ?;`

    cb(await crud.get_some(q, [id]));
}

function del_mi(j) {
    console.log(j);
    let { mid, iid } = j;
    let q = `delete from musician_instrument
             where musician_id = ?
             and instrument_id = ?`

    crud.del(q, [mid, iid]);
}

async function get_musician(id, cb) {
    let q = `select musician_id, name, age, gender, ph, price
             from musicians
             where musician_id = ?`;

    cb(await crud.get_one(q, [id]));
}

function update_musician(id, j) {
    let a = [ j.name, j.age, j.gender, j.ph, j.price, id];
    let q = `update musicians
             set name = ?,
             age = ?,
             gender = ?,
             ph = ?,
             price = ?
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
                   delete_musician,
                   musician_instruments,
                   specific_mi,
                   del_mi
                 };
