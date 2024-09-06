const database = require('../../config/db')

const insertProduct = async (posted_data) => {
    return new Promise(async resolve => {
        const query = `INSERT INTO products SET ?`
        database.query(query, posted_data, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while send product data.' + err });
            if (result && result.insertId) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while insert product data.', data: [] });
        });
    });
}

const getProductData = async (pro_cat_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                products
                            WHERE 
                                id = ?  
                            `
        database.query(query, [pro_cat_id], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
}

const checkProduct = async (category) => {
    return new Promise(async resolve => {

        const query = `SELECT * 
                            FROM 
                                products 
                            WHERE 
                                name = "${category.name}" 
                            AND 
                                bus_cat_id = "${category.bus_cat_id}"  
                            `
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert product data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true });
            return resolve({ status: true, isExist: false });
        });
    });
}

const getProductList = async (bus_cat_id) => {
    return new Promise(async resolve => {
        let listByCategory = ''
        if (bus_cat_id && bus_cat_id != null) listByCategory =` 
                                 bus_cat_id = "${bus_cat_id}" `
        const query = `SELECT * 
                            FROM 
                                products PC
                            WHERE  
                            ${listByCategory} 
                            `                
        database.query(query, [bus_cat_id], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: "Product  not found. Please enter valid category!" });
        });
    });
}

const getProduct = async (pro_cat_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM
                                products PC 
                            WHERE 
                                PC.id = "${pro_cat_id}"  
                            `
        database.query(query, function (err, result) {
             if (err) return resolve({ status: false, message: 'Error while insert user data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
} 
 



module.exports = {
    insertProduct,
    getProductData,
    checkProduct,
    getProductList,
    getProduct, 
}