const { SubProduct, UserProduct } = require("../models/index");

const addSubProduct = async (req, res) => {
    try {
        const body = req.body;

        let productId = ''

        const isExist = await SubProduct.checkSubProduct(body); 
        if (!isExist.status) return res.status(404).send({ status: false, message: isExist.message }); 
        if (isExist.isExist && isExist.data[0].deleted_at === 1) {
            await SubProduct.checkExistAndSaveData(body);
            productId = isExist.data[0].id;
        } else {
            if (isExist.isExist) return res.status(404).send({ status: false, message: "This Sub Product is already exist. Please try another one." });
            const jsonData = JSON.stringify(body.uom);
            body.uom = jsonData 
            const addSubProductData = await SubProduct.insertSubProduct(body);
            if (!addSubProductData.status) return res.status(400).send({ status: false, message: addSubProductData.message, data: {} });

            productId = addSubProductData.data.insertId;
        }

        const getSubProductDetails = await SubProduct.getSubProductData(productId);
        if (!getSubProductDetails.status) return res.status(400).send({ status: false, message: getSubProductDetails.message, data: {} });

        return res.status(200).send({ status: true, message: "Sub Product added successfully.", data: getSubProductDetails.data });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
} 
const updateSubProduct = async (req, res) => {
    try {
        const body = req.body;
        const { sub_pro_id } = req.query
  
        const isExist = await SubProduct.checkSubProductById(req.query); 
        if (!isExist.status) return res.status(404).send({ status: false, message: isExist.message });  
        if (!isExist.isExist) return res.status(404).send({ status: false, message: "This Sub Product is not exist. Please try another one." });

        body.id = sub_pro_id
        body.uom = JSON.stringify(body.uom);
          
        const updateData = await SubProduct.updateSubProduct(body);
        if (!updateData.status) return res.status(400).send({ status: false, message: updateData.message, data: {} });
   
        const getSubProductDetails = await SubProduct.getSubProductData(sub_pro_id);
        if (!getSubProductDetails.status) return res.status(400).send({ status: false, message: getSubProductDetails.message, data: {} });

        getSubProductDetails.data.uom = JSON.parse(getSubProductDetails.data.uom); 

        return res.status(200).send({ status: true, message: "Sub Product updated successfully.", data: getSubProductDetails.data });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const getProductListUserProduct = async (req, res) => {
    try {
        const { user_pro_id } = req.query

        const getUserProductData = await UserProduct.getUserProduct(user_pro_id);
        if (!getUserProductData.status) return res.status(400).send({ status: false, message: getUserProductData.message, data: {} });
        
        const data = { user_pro_id: getUserProductData.data.id, user_id: getUserProductData.data.user_id }
  
        const getSubProductsListData = await SubProduct.getSubProductsList(data);
        if (!getSubProductsListData.status) return res.status(400).send({ status: false, message: getSubProductsListData.message, data: {} });
        // console.log(getSubProductsListData.data);

        getSubProductsListData.data.map((item) => {
            item.uom = JSON.parse(item.uom); 
        });

        // return res.status(200).send({ status: true, message: "Sub Products list get successfully", data:getUserProductData , });
        return res.status(200).send({ status: true, message: "Sub Products list get successfully", data: getSubProductsListData.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const getSubProducts = async (req, res) => {
    try {
        const { sub_pro_id } = req.query

        const getSubProductData = await SubProduct.getSubProduct(sub_pro_id);
        if (!getSubProductData.status) return res.status(400).send({ status: false, message: getSubProductData.message, data: {} });
        
        getSubProductData.data.uom = JSON.parse(getSubProductData.data.uom); 
        return res.status(200).send({ status: true, message: "Product get successfully", data: getSubProductData.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const deleteSubProducts = async (req, res) => {  
    try {
        const { sub_pro_id } = req.query

        const data = { sub_pro_id }

        const checkSubProduct = await SubProduct.checkSubProductById(data);  
        if (!checkSubProduct.status) return res.status(404).send({ status: false, message: checkSubProduct.message }); 
        if (!checkSubProduct.isExist) return res.status(404).send({ status: false, message: "This Sub Product is not exist. Please check Sub Product." }); 

        const deleteSubProductData = await SubProduct.deleteSubProduct(sub_pro_id);
        if (!deleteSubProductData.status) return res.status(400).send({ status: false, message: deleteSubProductData.message, data: {} });

        return res.status(200).send({ status: true, message: "Sub Product delete successfully", data: {}, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const activeInactiveSubProducts = async (req, res) => {
    try {
        const { sub_pro_id } = req.query
  
        const checkSubProduct = await SubProduct.checkSubProductById(req.query);  
        if (!checkSubProduct.status) return res.status(404).send({ status: false, message: checkSubProduct.message }); 
        if (!checkSubProduct.isExist) return res.status(404).send({ status: false, message: "This Sub Product is not exist. Please check Sub Product." }); 
        
        const data = { sub_pro_id, status: (checkSubProduct.data.status == 1) ? 0 : 1 } 
        
        const activeInactiveData = await SubProduct.activeInactiveSubProduct(data);
        if (!activeInactiveData.status) return res.status(400).send({ status: false, message: activeInactiveData.message, data: {} });
        const status = (checkSubProduct.data.status == 0) ? "Active" : "Inactive"

        return res.status(200).send({ status: true, message: `Sub Product ${status} successfully`, data: {}, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}
 
module.exports = {
    addSubProduct,
    updateSubProduct,
    getProductListUserProduct,
    getSubProducts,
    deleteSubProducts,
    activeInactiveSubProducts
}