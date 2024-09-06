const crypto = require('crypto');

function hashPassword(password) {
    password = process.env.PASSWORD_SALT + password;
    var hash = crypto.createHash('sha1');
    hash.update(password);
    var value = hash.digest('hex');
    return value;
}

module.exports = {
    hashPassword
}