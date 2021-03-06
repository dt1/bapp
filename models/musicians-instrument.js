let crud = require('./crud');

function num_to_arr(z) {
    if (typeof(z) == 'string') {
        return [z];
    }
    return z;
}

function add_mi(j) {
    let muse =  j.musician;
    let insts = num_to_arr(j.instrument);

    qs = insts.map((i) => '(?,?)').join(',');
    q = `insert into musician_instrument (musician_id, instrument_id)
         values ${qs};`;
    na = insts.map((i) => [muse, i]).flat();

    crud.insert(q, na);
}

async function select_all(cb) {
    q = 'select * from musician_instrument'

    cb(await crud.get_all(q));
}

// select_all((i) => console.log(i));

module.exports = { add_mi
                 };
