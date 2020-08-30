let crud = require('./crud');

async function all_mtypes(cb) {
    let q = `select musician_type
             from musician_types;`
    cb(await crud.get_all(q));
}

async function all_itypes(cb) {
    let q = `select instrument_type
             from instrument_types;`
    cb(await crud.get_all(q));
}

function add_mtype(j) {
    console.log(j);
    let mtype = j.mtype;
    let q = `insert into musician_types(musician_type)
         values (?);`;

    crud.insert(q, [mtype]);
}

function add_itype(j) {
    console.log(j);
    let itype = j.itype;
    let q = `insert into instrument_types(instrument_type)
         values (?);`;

    crud.insert(q, [itype]);
}

function del_mtype(mtype) {
    let q = `delete from  musician_types
             where musician_type = ?;`;

    console.log("mm = " + JSON.stringify(mtype));
    crud.del(q, [mtype]);
}

function del_itype(itype) {
    let q = `delete from  instrument_types
             where instrument_type = ?;`;

    crud.del(q, [itype]);
}

// select_all((i) => console.log(i));

module.exports = { all_itypes,
                   all_mtypes,
                   add_mtype,
                   add_itype,
                   del_mtype,
                   del_itype
                 };
