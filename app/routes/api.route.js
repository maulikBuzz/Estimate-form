// const { request, response } = require("express");
const express = require("express");
const router = express.Router();
 
const settingsController = require("../controllers/settings.controller");
router.post("/contact-us", settingsController.contactUs);

const businessCategoryController = require("../controllers/business_categories.controller");
router.post("/business-category/add", businessCategoryController.addBusinessCategory);
router.get("/business-category/list", businessCategoryController.getBusinessCategoryList);
router.get("/business-category/get", businessCategoryController.getBusinessCategory);

const productController = require("../controllers/product.controller");
router.post("/product/add", productController.addProduct);
router.get("/product/list", productController.getProductListByBusCat);
router.get("/product/get", productController.getProduct); 
router.post("/product-variant/add", productController.addProductVariant); 
router.put("/product-variant/edit", productController.updateProductVariant);
router.get("/product-variant/list", productController.getProductListByProduct); 
router.get("/product-variant/get", productController.getProductVariants); 
router.delete("/product-variant/delete", productController.deleteProductVariants); 
router.get("/product-variant/active-inactive", productController.activeInactiveProductVariants); 

const userProductController = require("../controllers/user_product.controller");
router.post("/user-product/add", userProductController.addUserProduct);
router.put("/user-product/edit", userProductController.updateUserProduct);
router.get("/user-product/list", userProductController.getProductListUser); 
router.get("/user-product/get", userProductController.getUserProducts); 
router.delete("/user-product/delete", userProductController.deleteUserProducts); 
router.get("/user-product/active-inactive", userProductController.activeInactiveUserProducts); 

const subProductController = require("../controllers/sub_product.controller");
router.post("/sub-product/add", subProductController.addSubProduct);
router.put("/sub-product/edit", subProductController.updateSubProduct);
router.get("/sub-product/list", subProductController.getProductListUserProduct); 
router.get("/sub-product/get", subProductController.getSubProducts); 
router.delete("/sub-product/delete", subProductController.deleteSubProducts); 
router.get("/sub-product/active-inactive", subProductController.activeInactiveSubProducts); 

const measurementController = require("../controllers/measurements.controller");
router.post("/measurement/add", measurementController.addMeasurement);
router.put("/measurement/edit", measurementController.updateMeasurement); 
router.get("/measurement/list", measurementController.getMeasurementList); 
router.get("/measurement/get", measurementController.getMeasurements); 
router.delete("/measurement/delete", measurementController.deleteMeasurements); 
router.get("/measurement/active-inactive", measurementController.activeInactiveMeasurements); 

module.exports = router;
