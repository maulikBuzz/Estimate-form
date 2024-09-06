const { Product, ProductVariant } = require("../models/index");
 
// insert Product 
const addProduct = async (req, res) => {
    try {
        const body = req.body;

        const isExist = await Product.checkProduct(body);
        if (!isExist.status) return res.status(404).send({ status: false, message: isExist.message });
        if (isExist.isExist) return res.status(404).send({ status: false, message: "This Product is already exist. Please try another one." });

        const addProductData = await Product.insertProduct(body);
        if (!addProductData.status) return res.status(400).send({ status: false, message: addProductData.message, data: {} });

        var productId = addProductData.data.insertId;

        const getProductDetails = await Product.getProductData(productId);
        if (!getProductDetails.status) return res.status(400).send({ status: false, message: getProductDetails.message, data: {} });

        return res.status(400).send({ status: true, message: "Product added successfully.", data: getProductDetails.data });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// get Product  List By Business 
const getProductListByBusCat = async (req, res) => {
    try {
        const { bus_cat_id } = req.query

        const getProductListData = await Product.getProductList(bus_cat_id);
        if (!getProductListData.status) return res.status(400).send({ status: false, message: getProductListData.message, data: {} });

        return res.status(400).send({ status: true, message: "Product list get successfully", data: getProductListData.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// get Product by pro_cat_id
const getProduct = async (req, res) => {
    try {
        const { pro_cat_id } = req.query

        const getProductList = await Product.getProduct(pro_cat_id);
        if (!getProductList.status) return res.status(400).send({ status: false, message: getProductList.message, data: {} });

        return res.status(400).send({ status: true, message: "Product get successfully", data: getProductList.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// insert Product variant 
const addProductVariant = async (req, res) => {
    try {
        const body = req.body;

        let addProductVariantData = ''
        let productId = ''
        const isExist = await ProductVariant.checkProductVariant(body);
        if (!isExist.status) return res.status(404).send({ status: false, message: isExist.message }); 
        if (isExist.data[0].deleted_at === 1) {
            await ProductVariant.checkExistData(body); 
            productId = isExist.data[0].id; 
        } else {
            if (isExist.isExist) return res.status(404).send({ status: false, message: "This Product Variant is already exist. Please try another one." });

            addProductVariantData = await ProductVariant.insertProductVariant(body);
            if (!addProductVariantData.status) return res.status(400).send({ status: false, message: addProductVariantData.message, data: {} });
            if (!checkExistData.status) return res.status(400).send({ status: false, message: addProductVariantData.message, data: {} });

            productId = addProductVariantData.data.insertId;
        }
           
        const getProductVariantDetails = await ProductVariant.getProductVariantData(productId);
        if (!getProductVariantDetails.status) return res.status(400).send({ status: false, message: getProductVariantDetails.message, data: {} });

        return res.status(400).send({ status: true, message: "Product Variant added successfully.", data: getProductVariantDetails.data });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const getProductListByProduct = async (req, res) => {
    try {
        const { product_id } = req.query

        const getProductVariantsListData = await ProductVariant.getProductVariantsList(product_id);
        if (!getProductVariantsListData.status) return res.status(400).send({ status: false, message: getProductVariantsListData.message, data: {} });

        return res.status(400).send({ status: true, message: "Product Variants list get successfully", data: getProductVariantsListData.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const getProductVariants = async (req, res) => {
    try {
        const { pro_var_id } = req.query

        const getProductVariantData = await ProductVariant.getProductVariant(pro_var_id);
        if (!getProductVariantData.status) return res.status(400).send({ status: false, message: getProductVariantData.message, data: {} });

        return res.status(400).send({ status: true, message: "Product get successfully", data: getProductVariantData.data, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

 
module.exports = {
    addProduct,
    getProductListByBusCat,
    getProduct, 
    addProductVariant,
    getProductListByProduct,
    getProductVariants
}
    // const demo = async (req, res) => {
    //     try {
    
    //         const arrayData = [
    //             {
    //                 "name": "hello",
    //                 "data" :[
    //                     {
    //                         "id": 1,
    //                         "name": "Sofa-3",
    //                         "bus_cat_id": 1,
    //                         "status": 1,
    //                         "deleted_at": 0,
    //                         "created_at": "2024-09-04T09:46:57.000Z",
    //                         "updated_at": "2024-09-04T09:46:57.000Z"
    //                     },
    //                     {
    //                         "id": 2,
    //                         "name": "Sofa-3",
    //                         "bus_cat_id": 1,
    //                         "status": 1,
    //                         "deleted_at": 0,
    //                         "created_at": "2024-09-04T09:46:57.000Z",
    //                         "updated_at": "2024-09-04T09:46:57.000Z"
    //                     },
    //                     {
    //                         "id": 3,
    //                         "name": "Sofa-3",
    //                         "bus_cat_id": 1,
    //                         "status": 1,
    //                         "deleted_at": 0,
    //                         "created_at": "2024-09-04T09:46:57.000Z",
    //                         "updated_at": "2024-09-04T09:46:57.000Z"
    //                     },
    //                 ]
    //             }
    //         ]
    //         const jsonData = JSON.stringify(arrayData);
    
    //         // const deleteProductData = await Product.deleteProduct1(jsonData);
    //         // if (!deleteProductData.status) return res.status(400).send({ status: false, message: deleteProductData.message, data: {} });
            
    //         const deleteProductData2 = await Product.deleteProduct2();
    
    //         deleteProductData2.data.map((item) => { 
    //             const parsedData = JSON.parse(item.data);
                 
    //             item.data = parsedData;
             
    //         });
           
    
    
    //         return res.status(200).send({ status: true, message: "Product  delete successfully", data: deleteProductData2, });
    //     } catch (Err) {
    //         console.log(Err);
    //         return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    //     }
    // }
 