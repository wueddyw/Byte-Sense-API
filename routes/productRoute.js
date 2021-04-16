const router = require("express").Router();
const productController = require("../products/controller");
router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.delete("/:id", productController.removeProduct);
router.get("/:id", productController.getProductById);

module.exports = router;