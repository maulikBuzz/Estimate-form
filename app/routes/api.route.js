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
router.get("/product-variant/list", productController.getProductListByProduct); 
router.get("/product-variant/get", productController.getProductVariants); 

// router.post("/demo", productController.demo);

module.exports = router;
