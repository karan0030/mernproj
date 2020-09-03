const express =require("express")
const router =express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
    getCategoryById,createCategory,getAllCategory,getCategory,updateCategory,removeCategory
} =require("../controllers/category")

const{ getUserById} = require("../controllers/user");

router.param("userid",getUserById)
router.param("categoryId",getCategoryById)


//my route
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)
router.post("/category/create/:userid",isSignedIn,isAuthenticated,isAdmin,createCategory)

router.put("/category/:categoryId/:userid",isSignedIn,isAuthenticated,isAdmin,updateCategory)

router.delete("/category/:categoryId/:userid",isSignedIn,isAuthenticated,isAdmin,removeCategory)



module.exports=router;