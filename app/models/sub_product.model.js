const database = require('../../config/db')

const checkSubProduct = async (category) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                sub_product
                            WHERE 
                                user_id  = "${category.user_id}" 
                            AND 
                                user_pro_id = "${category.user_pro_id}" 
                            AND 
                                status = 1
                            AND 
                                name = "${category.name}"
                            `
                            console.log(query);
                            
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while check Sub Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true, data :result });
            return resolve({ status: true, isExist: false });
        });
    });
}

const checkExistAndSaveData = async (category) => {
    return new Promise(async resolve => {
        const query = `UPDATE sub_product
                            SET 
                                deleted_at = 0
                            WHERE 
                                user_id = "${category.user_id}" 
                            AND 
                                sub_pro_id = "${category.sub_pro_id}"  
                            `
        database.query(query, [category], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while check Sub Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
} 

const insertSubProduct = async (posted_data) => {
    return new Promise(async resolve => {
        const query = `INSERT INTO sub_product SET ?`  
        database.query(query, posted_data, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert Sub Product data.' + err });
            if (result && result.insertId) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while insert Sub Product data.', data: [] });
        });
    });
}
const getSubProductData = async (sub_pro_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                sub_product
                            WHERE 
                                id = ?  
                            ` 
                            
        database.query(query, [sub_pro_id], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert Sub Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
}

const updateSubProduct = async (postedData) => {
    return new Promise(async resolve => {  
        const query = `UPDATE sub_product SET ? WHERE id = ?` 
        database.query(query, [postedData, postedData.id], function (err, result) { 
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while update Sub Product data' });
        });
    });
} 

const checkSubProductById = async (postedData) => {
    return new Promise(async resolve => { 
        const query = `SELECT * 
                            FROM 
                                sub_product
                            WHERE 
                                id = "${postedData.sub_pro_id}"
                            AND 
                                deleted_at = 0
                            `    
                            console.log(query);
                            
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert Sub Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true, data :result[0] });
            return resolve({ status: true, isExist: false });
        });
    });
}
 
const getSubProductsList = async (postedData) => {
    return new Promise(async resolve => {
       
        
        const query = `SELECT * 
                            FROM 
                                sub_product 
                            WHERE
                                user_pro_id = "${postedData.user_pro_id}"
                            AND
                                user_id = "${postedData.user_id}"
                            AND
                                deleted_at = 0
                            AND
                                status = 1
                            `  
                            console.log(query);
                            
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert Sub Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: "Sub Product not found. Please enter valid product!" });
        });
    });
}

const getSubProduct = async (sub_pro_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM    
                                sub_product UP 
                            WHERE 
                                UP.id = "${sub_pro_id}"  
                            AND
                                UP.deleted_at = 0
                            AND
                                UP.status = 1
                            `

                            console.log(query);
                            
        database.query(query, function (err, result) {
             if (err) return resolve({ status: false, message: 'Error while insert Sub Product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Sub Product not found. Please enter valid product!" });
        });
    });
} 
const deleteSubProduct = async (sub_pro_id) => {
    return new Promise(async resolve => {
        const query = `UPDATE sub_product
                            SET 
                                deleted_at = 1
                            WHERE 
                                id = "${sub_pro_id}"
                            AND
                               status = 1 
                            ` 
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while update Sub Product data' });
        });
    });
} 

const activeInactiveSubProduct = async (user_pro_data) => {
    return new Promise(async resolve => {  
        const query = `UPDATE sub_product
                            SET 
                                status = "${user_pro_data.status}"
                            WHERE 
                                id = "${user_pro_data.sub_pro_id}"
                            AND
                               deleted_at = 0 
                            ` 
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while Sub Product data' });
        });
    });
} 

module.exports = {
    checkSubProduct,
    checkExistAndSaveData,
    insertSubProduct,
    getSubProductData,
    updateSubProduct,
    checkSubProductById,
    getSubProduct,
    getSubProductsList,
    deleteSubProduct,
    activeInactiveSubProduct
}