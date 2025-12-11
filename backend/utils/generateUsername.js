function generateUsername(fullName) {
    const parts = fullName
        .toLowerCase()
        .split(/\s+/)
        .filter((v, i, arr) => arr.indexOf(v) === i); // remove repeated words

    const base = parts.join('');
    const rand = Math.random().toString(36).slice(2, 6);
    return `${base}_${rand}`;
}

module.exports = generateUsername;
