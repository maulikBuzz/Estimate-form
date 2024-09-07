const database = require('../../config/db')

const insertProductVariant = async (posted_data) => {
    return new Promise(async resolve => {
        const query = `INSERT INTO product_variants SET ?`
        database.query(query, posted_data, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while send contact us data.' + err });
            if (result && result.insertId) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while insert product variants data.', data: [] });
        });
    });
}
 
const checkProductVariant = async (category) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                product_variants
                            WHERE 
                                name = "${category.name}" 
                            AND 
                                product_id = "${category.product_id}" 
                            AND 
                                status = 1
                            `
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert product variants data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true, data :result });
            return resolve({ status: true, isExist: false });
        });
    });
}

const checkProductVariantById = async (product_variants) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                product_variants
                            WHERE 
                                id = "${product_variants.pro_var_id}"
                            AND 
                                deleted_at = 0
                            `    
                            console.log(query);
                            
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert product variants data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true, data :result[0] });
            return resolve({ status: true, isExist: false });
        });
    });
}

const getProductVariantData = async (pro_var_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                product_variants
                            WHERE 
                                id = ?  
                            `
        database.query(query, [pro_var_id], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert product variants data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
}

const checkExistAndSaveData = async (category) => {
    return new Promise(async resolve => {
        const query = `UPDATE product_variants
                            SET 
                                deleted_at = 0
                            WHERE 
                                name = "${category.name}" 
                            AND 
                                product_id = "${category.product_id}"  
                            `
        database.query(query, [category], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert product variants data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
}

const updateProductVariant = async (postedData) => {
    return new Promise(async resolve => {
        const query = `UPDATE product_variants SET ? WHERE id = ?`
        console.log(postedData);
        console.log(query);
        
        database.query(query, [postedData, postedData.id], function (err, result) {
            console.log();
            
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while update product variant data' });
        });
    });
}


const getProductVariantsList = async (product_id) => {
    return new Promise(async resolve => {
        let listByCategory = ''
        if (product_id && product_id != null) listByCategory =` WHERE 
                                 product_id = "${product_id}" `
        const query = `SELECT * 
                            FROM 
                                product_variants PC
                              
                            ${listByCategory} 
                            `  
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert Product Variant data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: "Product Variant not found. Please enter valid category!" });
        });
    });
}

const getProductVariant = async (pro_var_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM    
                                product_variants PC 
                            WHERE 
                                PC.id = "${pro_var_id}"  
                            `
        database.query(query, function (err, result) {
             if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
} 
 
const deleteProductVariant = async (pro_var_id) => {
    return new Promise(async resolve => {
        const query = `UPDATE product_variants
                            SET 
                                deleted_at = 1
                            WHERE 
                                id = "${pro_var_id}"
                            AND
                               status = 1 
                            ` 
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while update product variant data' });
        });
    });
} 
 
const activeInactiveProductVariant = async (pro_var_data) => {
    return new Promise(async resolve => {
        const query = `UPDATE product_variants
                            SET 
                                status = "${pro_var_data.status}"
                            WHERE 
                                id = "${pro_var_data.pro_var_id}"
                            AND
                               deleted_at = 0 
                            ` 
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while update product variant data' });
        });
    });
} 
 
module.exports = {
    checkProductVariant,
    insertProductVariant,
    getProductVariantData,
    checkExistAndSaveData,
    getProductVariantsList,
    getProductVariant,
    deleteProductVariant,
    checkProductVariantById,
    activeInactiveProductVariant,
    updateProductVariant
}