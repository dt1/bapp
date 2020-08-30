let db = require('./conn');

const usr_table = `
create table if not exists usr(
uid integer primary key,
uname text,
pwd text
);`

const musicians_table = `
create table if not exists musicians(
musician_id integer primary key,
name text,
age int,
gender text check(gender in ('m', 'f')),
ph text,
price integer
);`

const instruments_table = `
create table if not exists instruments (
instrument_id integer primary key,
name text,
type text,
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

// drop_table('musicians');
