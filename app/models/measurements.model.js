const database = require('../../config/db')

const checkMeasurement = async (category) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                measurements
                            WHERE 
                                unit   = "${category.unit}" 
                            AND 
                                status = 1
                            `
                            console.log(query);
                            
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while check Measurement data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true, data :result });
            return resolve({ status: true, isExist: false });
        });
    });
}

const checkExistAndSaveData = async (category) => {
    return new Promise(async resolve => {
        const query = `UPDATE measurements
                            SET 
                                deleted_at = 0
                            WHERE 
                                unit = "${category.unit}"
                            AND 
                                abbreviation = "${category.abbreviation}"
                            `
        database.query(query, [category], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while check Measurement data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
} 

const insertMeasurement = async (posted_data) => {
    return new Promise(async resolve => {
        const query = `INSERT INTO measurements SET ?`  
        database.query(query, posted_data, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert Measurement data.' + err });
            if (result && result.insertId) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while insert Measurement data.', data: [] });
        });
    });
}
const getMeasurementData = async (measurement_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM 
                                measurements
                            WHERE 
                                id = ?  
                            ` 
                            
        database.query(query, [measurement_id], function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert Measurement data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Something is wrong.Please try again." });
        });
    });
}

const updateMeasurement = async (postedData) => {
    return new Promise(async resolve => {  
        const query = `UPDATE measurements SET ? WHERE id = ?` 
        database.query(query, [postedData, postedData.id], function (err, result) { 
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while update Measurement data' });
        });
    });
} 

const checkMeasurementById = async (postedData) => {
    return new Promise(async resolve => { 
        const query = `SELECT * 
                            FROM 
                                measurements
                            WHERE 
                                id = "${postedData.measurement_id}"
                            AND 
                                deleted_at = 0
                            `    
                            console.log(query);
                            
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert Measurement data.' + err });
            if (result && result.length > 0) return resolve({ status: true, isExist: true, data :result[0] });
            return resolve({ status: true, isExist: false });
        });
    });
}

const getMeasurementsList = async () => {
    return new Promise(async resolve => {
        const query = `SELECT * FROM measurements`
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while insert Measurement data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: "Measurement not found. Please enter valid product!" });
        });
    });
}

const getMeasurement = async (measurement_id) => {
    return new Promise(async resolve => {
        const query = `SELECT * 
                            FROM    
                                measurements MZR 
                            WHERE 
                                MZR.id = "${measurement_id}"  
                            AND
                                MZR.deleted_at = 0
                            AND
                                MZR.status = 1
                            `
        database.query(query, function (err, result) {
             if (err) return resolve({ status: false, message: 'Error while insert Measurement data.' + err });
            if (result && result.length > 0) return resolve({ status: true, data: result[0], message: 'success' });
            return resolve({ status: false, message: "Measurement not found. Please enter valid product!" });
        });
    });
} 
const deleteMeasurement = async (measurement_id) => {
    return new Promise(async resolve => {
        const query = `UPDATE measurements
                            SET 
                                deleted_at = 1
                            WHERE 
                                id = "${measurement_id}"
                            AND
                               status = 1 
                            ` 
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while update Measurement data' });
        });
    });
} 

const activeInactiveMeasurement = async (user_pro_data) => {
    return new Promise(async resolve => {  
        const query = `UPDATE measurements
                            SET 
                                status = "${user_pro_data.status}"
                            WHERE 
                                id = "${user_pro_data.measurement_id}"
                            AND
                               deleted_at = 0 
                            ` 
        database.query(query, function (err, result) {
            if (err) return resolve({ status: false, message: 'Error while update Match ID data.' + err });
            if (result && result.affectedRows) return resolve({ status: true, data: result, message: 'success' });
            return resolve({ status: false, message: 'Something went wrong. while Measurement data' });
        });
    });
} 

module.exports = {
    checkMeasurement,
    checkExistAndSaveData,
    insertMeasurement,
    getMeasurementData,
    updateMeasurement,
    checkMeasurementById,
    getMeasurement,
    getMeasurementsList,
    deleteMeasurement,
    activeInactiveMeasurement
}