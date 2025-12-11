const { v4: uuidv4 } = require('uuid');
function generateResetToken() {
    const token = uuidv4();
    return token;
}

function generateTokenUsingEmail(email) {
    const token = uuidv4();
    let appendPart = email.split("@")[0];
    appendPart = appendPart.length > 5 ? appendPart.slice(0, 5) : appendPart;
    return appendPart + token;
}

module.exports = {
    generateResetToken,
    generateTokenUsingEmail
}