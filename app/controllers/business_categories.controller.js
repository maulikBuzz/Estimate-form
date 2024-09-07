const { BusCategory } = require("../models/index");

// insert Business Category
const addBusinessCategory = async (req, res) => {
    try {
        const body = req.body;

        const isExist = await BusCategory.checkBusinessCategory(body.name);
        if (!isExist.status) return res.status(404).send({ status: false, message: isExist.message });
        if (isExist.isExist) return res.status(404).send({ status: false, message: "This category is already exist. Please try another one." });

        const addBusinessCategoryData = await BusCategory.insertBusinessCategory(body);
        if (!addBusinessCategoryData.status) return res.status(400).send({ status: false, message: addBusinessCategoryData.message, data: {/*  */ } });

        var businessCategoryId = addBusinessCategoryData.data.insertId;

        const getBusinessCategoryDetails = await BusCategory.getBusinessCategoryData(businessCategoryId);
        if (!getBusinessCategoryDetails.status) return res.status(400).send({ status: false, message: getBusinessCategoryDetails.message, data: {} });

        return res.status(200).send({ status: true, message: "Business category added successfully.", data: getBusinessCategoryDetails, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// get Business Category List
const getBusinessCategoryList = async (req, res) => {
    try {

        const getBusinessCategoryList = await BusCategory.getBusinessCategoryList();
        if (!getBusinessCategoryList.status) return res.status(400).send({ status: false, message: getBusinessCategoryList.message, data: {} });

        return res.status(200).send({ status: true, message: "Business category list get successfully", message: getBusinessCategoryList.data, data: {} });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// get Business Category by bus_cat_id
const getBusinessCategory = async (req, res) => {
    try {
        const { bus_cat_id } = req.query

        const getBusinessCategoryData = await BusCategory.getBusinessCategory(bus_cat_id);
        if (!getBusinessCategoryData.status) return res.status(400).send({ status: false, message: getBusinessCategoryData.message, data: {} });

        return res.status(200).send({ status: true, message: "Business category get successfully", data: getBusinessCategoryData.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}


module.exports = {
    addBusinessCategory,
    getBusinessCategoryList,
    getBusinessCategory
}
