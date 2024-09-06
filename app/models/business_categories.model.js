const database = require('../../config/db')

const insertBusinessCategory = async (posted_data) => {
    return new Promise(async resolve => {
        const query = `INSERT INTO business_categories SET ?`
        database.query(query, posted_data, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while send contact us data.' + err });
            if (result && result.insertId) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while insert business categories data.', data: [] });
        });
    });
}

const getBusinessCategoryData = async (bus_cat_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * FROM business_categories WHERE id = ?`
        database.query(query, [bus_cat_id], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
}

const checkBusinessCategory = async (name) => {
    return new Promise(async resolve => {
        const query = `SELECT * FROM business_categories WHERE name = ?`
        database.query(query, [name], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true });
            return resolve({ status: true, isExist: false });
        });
    });
}

const getBusinessCategoryList = async (category) => {
    return new Promise(async resolve => {
        const query = `SELECT * FROM business_categories`
        database.query(query, [category], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
}

const getBusinessCategory = async (bus_cat_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                        FROM
                            business_categories CAT 
                        WHERE 
                            CAT.id = "${bus_cat_id}"  
                        `
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
}
 
module.exports = {
    insertBusinessCategory,
    getBusinessCategoryData,
    checkBusinessCategory,
    getBusinessCategoryList,
    getBusinessCategory
}