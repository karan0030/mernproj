const express =require("express")
const router =express.Router();

const {
    getProductById,createProduct,getProduct,getPhoto,
    updateProduct,deleteProduct,getAllProduct,getAllUniqueCategory
}=require("../controllers/product")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const{ getUserById} = require("../controllers/user");

router.param("userId",getUserById)
router.param("productId",getProductById)

router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)

//read
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",getPhoto);
router.get("/product",getAllProduct);
router.get("/product/category",getAllUniqueCategory)

router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)
//delete
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)


module.exports=router;