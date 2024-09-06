const database = require('../../config/db')

const insertContactUSData = async (posted_data) => {
    return new Promise(async resolve => {
        const query = `INSERT INTO contact_us SET ?`
        database.query(query, posted_data, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while send contact us data.' + err });
            if (result && result.insertId) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while insert contact us data.', data: [] });
        });
    });
}

module.exports = {
    insertContactUSData
}