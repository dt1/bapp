let db = require('./conn');

const usr_table = `
create table if not exists usr(
uid integer primary key,
uname text not null,
pwd text not null
);`

const valid_muse_type = `
create table if not exists musician_types (
musician_type text primary key
);
`

const musicians_table = `
create table if not exists musicians(
musician_id integer primary key,
name text,
musician_type text references musician_types(musician_type),
age int,
gender text check(gender in ('m', 'f')),
ph text,
price integer
);`

const valid_instrument_type = `
create table if not exists instrument_types (
instrument_type text primary key
);
`

const instruments_table = `
create table if not exists instruments (
instrument_id integer primary key,
name text,
type text references instrument_types(instrument_type),
price integer
)`;

const musician_instrument = `
create table if not exists musician_instrument (
musician_id integer references musicians (musician_id) on delete cascade,
instrument_id integer references instruments (instrument_id) on delete cascade,
primary key(musician_id, instrument_id)
)`;

function create_table (tbl) {
    db.run(tbl, (err) => {
        if (err) {
            console.log(`create ${tbl} table ${err}`);
        }
        console.log(`${tbl} table created`);
        db.close();
    });
}

function drop_table (tbl) {
    db.run(`drop table ${tbl}`, (err) => {
        if (err) {
            console.log(`drop ${tbl} ${err}`);
        }
        console.log(`${tbl} dropped`);
        db.close();
    });
}

create_table(usr_table);
create_table(musicians_table);
create_table(instruments_table);
create_table(musician_instrument);
create_table(valid_instrument_type);
create_table(valid_muse_type);

// drop_table('musicians');
