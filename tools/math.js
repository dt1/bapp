// math on arrays

function sum(a) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return a.reduce(reducer);
}

function nums (a, k) {
    return a.map((i) => i[k])
}

function avg(a, k) {
    let ns = nums(a, k);
    return sum(ns) / a.length;
}

function ttl(a, k) {
    let ns = nums(a, k);
    return sum(ns);
}

function max(a, k) {
    let ns = nums(a, k);
    return Math.max.apply(null, ns);
}

function min(a, k) {
    let ns = nums(a, k)
    return Math.min.apply(null, ns);
}


module.exports = {
    avg,
    ttl,
    max,
    min
}
