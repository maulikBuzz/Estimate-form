const { UserProduct } = require("../models/index");

const addUserProduct = async (req, res) => {
    try {
        const body = req.body;
 
        let productId = ''
        const isExist = await UserProduct.checkUserProduct(body); 
        if (!isExist.status) return res.status(404).send({ status: false, message: isExist.message }); 
        if (isExist.isExist && isExist.data[0].deleted_at === 1) {
            await UserProduct.checkExistAndSaveData(body);
            productId = isExist.data[0].id;
        } else {
            if (isExist.isExist) return res.status(404).send({ status: false, message: "This User Product is already exist. Please try another one." });

            const addUserProductData = await UserProduct.insertUserProduct(body);
            if (!addUserProductData.status) return res.status(400).send({ status: false, message: addUserProductData.message, data: {} });

            productId = addUserProductData.data.insertId;
        }

        const getUserProductDetails = await UserProduct.getUserProductData(productId);
        if (!getUserProductDetails.status) return res.status(400).send({ status: false, message: getUserProductDetails.message, data: {} });

        return res.status(200).send({ status: true, message: "User Product added successfully.", data: getUserProductDetails.data });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
} 
const updateUserProduct = async (req, res) => {
    try {
        const body = req.body;
        const { user_pro_id } = req.query
  
        const isExist = await UserProduct.checkUserProductById(req.query); 
        if (!isExist.status) return res.status(404).send({ status: false, message: isExist.message });  
        if (!isExist.isExist) return res.status(404).send({ status: false, message: "This User Product is not exist. Please try another one." });

        const data = { user_id: body.user_id, id: user_pro_id }
        const updateData = await UserProduct.updateUserProduct(data);
        if (!updateData.status) return res.status(400).send({ status: false, message: updateData.message, data: {} });
  
        const getUserProductDetails = await UserProduct.getUserProductData(user_pro_id);
        if (!getUserProductDetails.status) return res.status(400).send({ status: false, message: getUserProductDetails.message, data: {} });

        return res.status(200).send({ status: true, message: "User Product updated successfully.", data: getUserProductDetails.data });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const getProductListUser = async (req, res) => {
    try {
        const { user_id } = req.query

        const getUserProductsListData = await UserProduct.getUserProductsList(user_id);
        if (!getUserProductsListData.status) return res.status(400).send({ status: false, message: getUserProductsListData.message, data: {} });

        return res.status(200).send({ status: true, message: "User Products list get successfully", data: getUserProductsListData.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const getUserProducts = async (req, res) => {
    try {
        const { user_pro_id } = req.query

        const getUserProductData = await UserProduct.getUserProduct(user_pro_id);
        if (!getUserProductData.status) return res.status(400).send({ status: false, message: getUserProductData.message, data: {} });

        return res.status(200).send({ status: true, message: "Product get successfully", data: getUserProductData.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const deleteUserProducts = async (req, res) => {  
    try {
        const { user_pro_id } = req.query

        const data = { user_pro_id }

        const checkUserProduct = await UserProduct.checkUserProductById(data);  
        if (!checkUserProduct.status) return res.status(404).send({ status: false, message: checkUserProduct.message }); 
        if (!checkUserProduct.isExist) return res.status(404).send({ status: false, message: "This User Product is not exist. Please check User Product." }); 

        const deleteUserProductData = await UserProduct.deleteUserProduct(user_pro_id);
        if (!deleteUserProductData.status) return res.status(400).send({ status: false, message: deleteUserProductData.message, data: {} });

        return res.status(200).send({ status: true, message: "User Product delete successfully", data: {}, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const activeInactiveUserProducts = async (req, res) => {
    try {
        const { user_pro_id } = req.query
  
        const checkUserProduct = await UserProduct.checkUserProductById(req.query);  
        if (!checkUserProduct.status) return res.status(404).send({ status: false, message: checkUserProduct.message }); 
        if (!checkUserProduct.isExist) return res.status(404).send({ status: false, message: "This User Product is not exist. Please check User Product." }); 
        
        const data = { user_pro_id, status: (checkUserProduct.data.status == 1) ? 0 : 1 } 
        
        const activeInactiveData = await UserProduct.activeInactiveUserProduct(data);
        if (!activeInactiveData.status) return res.status(400).send({ status: false, message: activeInactiveData.message, data: {} });
        const status = (checkUserProduct.data.status == 0) ? "Active" : "Inactive"

        return res.status(200).send({ status: true, message: `User Product ${status} successfully`, data: {}, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}
 
module.exports = {
    addUserProduct,
    updateUserProduct,
    getProductListUser,
    getUserProducts,
    deleteUserProducts,
    activeInactiveUserProducts
}