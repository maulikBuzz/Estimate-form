const database = require('../../config/db')

const insertUserData = async (postedData) => {
    return new Promise(async resolve => {
        const query = `INSERT INTO users SET ?`
        database.query(query, [postedData], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.insertId) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while insert user data.', data: [] });
        });
    });
}

const checkEmail = async (email) => {
    return new Promise(async resolve => {
        const query = `SELECT * FROM users WHERE email = ?`
        database.query(query, [email], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true });
            return resolve({ status: true, isExist: false });
        });
    });
}

const getProfileData = async (profileId) => { 
    return new Promise(async resolve => {
        const query = `SELECT id, user_name, email, status FROM users WHERE id = ?`
        database.query(query, [profileId], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
}
 
const loginData = async (userData) => {
    return new Promise(async resolve => {
        const query = `SELECT  id, user_name, email, status FROM users PRO WHERE 
                                PRO.password ="${userData.password}"
                                AND PRO.email = "${userData.email}"
                                AND PRO.status = 1;`
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) {
                result = result[0];
                return resolve({ status: true, data: result, message: 'success' });
            }
            return resolve({ status: false, message: 'Email or password is incorrect.', data: [] });
        });
    });
}

module.exports = {
    insertUserData,
    checkEmail,
    getProfileData,
    loginData
}