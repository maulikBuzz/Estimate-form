const database = require('../../config/db')

const checkUserProduct = async (category) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                user_products
                            WHERE 
                                user_id  = "${category.user_id}" 
                            AND 
                                product_id = "${category.product_id}" 
                            AND 
                                status = 1
                            `
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while check User Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true, data :result });
            return resolve({ status: true, isExist: false });
        });
    });
}

const checkExistAndSaveData = async (category) => {
    return new Promise(async resolve => {
        const query = `UPDATE user_products
                            SET 
                                deleted_at = 0
                            WHERE 
                                user_id = "${category.user_id}" 
                            AND 
                                product_id = "${category.product_id}"  
                            `
        database.query(query, [category], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while check User Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
} 

const insertUserProduct = async (posted_data) => {
    return new Promise(async resolve => {
        const query = `INSERT INTO user_products SET ?`
        database.query(query, posted_data, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while send contact us data.' + err });
            if (result && result.insertId) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while insert User Product data.', data: [] });
        });
    });
}
const getUserProductData = async (user_pro_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                user_products
                            WHERE 
                                id = ?  
                            `
        database.query(query, [user_pro_id], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert User Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
}

const updateUserProduct = async (postedData) => {
    return new Promise(async resolve => {
        const query = `UPDATE user_products SET ? WHERE id = ?` 
        database.query(query, [postedData, postedData.id], function (err, result) {
            console.log();
            
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while update User Product data' });
        });
    });
} 

const checkUserProductById = async (postedData) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                user_products
                            WHERE 
                                id = "${postedData.user_pro_id}"
                            AND 
                                deleted_at = 0
                            `    
                            console.log(query,1);
                            
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert User Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true, data :result[0] });
            return resolve({ status: true, isExist: false });
        });
    });
}
 
const getUserProductsList = async (user_id) => {
    return new Promise(async resolve => {
        let listByCategory = ''
        if (user_id && user_id != null) listByCategory =` WHERE 
                                 user_id = "${user_id}" `
        const query = `SELECT * 
                            FROM 
                                user_products 
                            ${listByCategory} 
                            `  
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert User Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: "User Product not found. Please enter valid product!" });
        });
    });
}

const getUserProduct = async (user_pro_id) => {
    return new Promise(async resolve => { 
        const query = `SELECT * 
                            FROM    
                                user_products UP 
                            WHERE 
                                UP.id = "${user_pro_id}"  
                            AND
                                UP.deleted_at = 0
                            AND
                                UP.status = 1
                            `
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "User Product not found. Please enter valid product!" });
        });
    });
} 
const deleteUserProduct = async (user_pro_id) => {
    return new Promise(async resolve => {
        const query = `UPDATE user_products
                            SET 
                                deleted_at = 1
                            WHERE 
                                id = "${user_pro_id}"
                            AND
                               status = 1 
                            ` 
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while update User Product data' });
        });
    });
} 

const activeInactiveUserProduct = async (user_pro_data) => {
    return new Promise(async resolve => {  
        const query = `UPDATE user_products
                            SET 
                                status = "${user_pro_data.status}"
                            WHERE 
                                id = "${user_pro_data.user_pro_id}"
                            AND
                               deleted_at = 0 
                            ` 
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while User Product data' });
        });
    });
} 

module.exports = {
    checkUserProduct,
    checkExistAndSaveData,
    insertUserProduct,
    getUserProductData,
    updateUserProduct,
    checkUserProductById,
    getUserProduct,
    getUserProductsList,
    deleteUserProduct,
    activeInactiveUserProduct
}