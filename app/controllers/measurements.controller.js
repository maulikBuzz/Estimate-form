const { Measurement } = require("../models/index");

const addMeasurement = async (req, res) => {
    try {
        const body = req.body;

        let productId = ''

        const isExist = await Measurement.checkMeasurement(body); 
        if (!isExist.status) return res.status(404).send({ status: false, message: isExist.message }); 
        if (isExist.isExist && isExist.data[0].deleted_at === 1) {
            await Measurement.checkExistAndSaveData(body);
            productId = isExist.data[0].id;
        } else {
            if (isExist.isExist) return res.status(404).send({ status: false, message: "This Measurement is already exist. Please try another one." }); 
            const addMeasurementData = await Measurement.insertMeasurement(body);
            if (!addMeasurementData.status) return res.status(400).send({ status: false, message: addMeasurementData.message, data: {} });

            productId = addMeasurementData.data.insertId;
        }

        const getMeasurementDetails = await Measurement.getMeasurementData(productId);
        if (!getMeasurementDetails.status) return res.status(400).send({ status: false, message: getMeasurementDetails.message, data: {} });

        return res.status(200).send({ status: true, message: "Measurement added successfully.", data: getMeasurementDetails.data });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
} 
const updateMeasurement = async (req, res) => {
    try {
        const body = req.body;
        const { measurement_id } = req.query
  
        const isExist = await Measurement.checkMeasurementById(req.query); 
        if (!isExist.status) return res.status(404).send({ status: false, message: isExist.message });  
        if (!isExist.isExist) return res.status(404).send({ status: false, message: "This Measurement is already exist. Please try another one." });

        body.id = measurement_id 
          
        const updateData = await Measurement.updateMeasurement(body);
        if (!updateData.status) return res.status(400).send({ status: false, message: updateData.message, data: {} });
   
        const getMeasurementDetails = await Measurement.getMeasurementData(measurement_id);
        if (!getMeasurementDetails.status) return res.status(400).send({ status: false, message: getMeasurementDetails.message, data: {} });

        return res.status(200).send({ status: true, message: "Measurement updated successfully.", data: getMeasurementDetails.data });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const getMeasurementList = async (req, res) => {
    try { 
        const getMeasurementsListData = await Measurement.getMeasurementsList();
        if (!getMeasurementsListData.status) return res.status(400).send({ status: false, message: getMeasurementsListData.message, data: {} });
       
        return res.status(200).send({ status: true, message: "Measurements list get successfully", data: getMeasurementsListData.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const getMeasurements = async (req, res) => {
    try {
        const { measurement_id } = req.query

        const getMeasurementData = await Measurement.getMeasurement(measurement_id);
        if (!getMeasurementData.status) return res.status(400).send({ status: false, message: getMeasurementData.message, data: {} });
         
        return res.status(200).send({ status: true, message: "Measurement get successfully", data: getMeasurementData.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const deleteMeasurements = async (req, res) => {  
    try {
        const { measurement_id } = req.query

        const data = { measurement_id }

        const checkMeasurement = await Measurement.checkMeasurementById(data);  
        if (!checkMeasurement.status) return res.status(404).send({ status: false, message: checkMeasurement.message }); 
        if (!checkMeasurement.isExist) return res.status(404).send({ status: false, message: "This Measurement is not exist. Please check Measurement." }); 

        const deleteMeasurementData = await Measurement.deleteMeasurement(measurement_id);
        if (!deleteMeasurementData.status) return res.status(400).send({ status: false, message: deleteMeasurementData.message, data: {} });

        return res.status(200).send({ status: true, message: "Measurement delete successfully", data: {}, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const activeInactiveMeasurements = async (req, res) => {
    try {
        const { measurement_id } = req.query
  
        const checkMeasurement = await Measurement.checkMeasurementById(req.query);  
        if (!checkMeasurement.status) return res.status(404).send({ status: false, message: checkMeasurement.message }); 
        if (!checkMeasurement.isExist) return res.status(404).send({ status: false, message: "This Measurement is not exist. Please check Measurement." }); 
        
        const data = { measurement_id, status: (checkMeasurement.data.status == 1) ? 0 : 1 } 
        
        const activeInactiveData = await Measurement.activeInactiveMeasurement(data);
        if (!activeInactiveData.status) return res.status(400).send({ status: false, message: activeInactiveData.message, data: {} });
        const status = (checkMeasurement.data.status == 0) ? "Active" : "Inactive"

        return res.status(200).send({ status: true, message: `Measurement ${status} successfully`, data: {}, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}
 
module.exports = {
    addMeasurement,
    updateMeasurement,
    getMeasurementList,
    getMeasurements,
    deleteMeasurements,
    activeInactiveMeasurements
}