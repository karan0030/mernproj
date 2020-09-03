const Category = require("../models/category");

exports.getCategoryById =(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err)
        {
            return res.status(400).json({error:" no id found"})
        }
        req.category=cate
		
		next();
    })
    
}








exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save category in DB"
        });
      }
      res.json({ category });
    });
  };
  

// exports.createCategory= (req,res)=>{
//     const category =new Category(req.body)
//     category.save((err,category)=>{
//         if(err){
//             return res.status(400).json({error:" unable to add in DB"})
//         }
//         res.json({category})
//     })    
// }

exports.getAllCategory =(req,res)=>{
   Category.find().exec((err,catogries)=>{
       if(err){
           return res.status(400).json({error:"No category found!! "})
       }
       res.json(catogries)
   })
    
}


exports.updateCategory=(req,res)=>{
	console.log(req.body.name)
    const category =req.category
    category.name =req.body.name
    category.save((err,updatedCat)=>{
        if(err){
            return res.status(400).json({error:"Update fail !!"})
        }
        res.json(updatedCat)
    })
}

exports.getCategory =(req,res)=>{

	console.log(req.category.name)
    res.json(req.Category)
}

exports.removeCategory =(req,res)=>{
    const category =req.category
    category.remove((err,removed)=>{
        if(err){
            return res.status(400).json({error:"Delete fail"})
        }

        res.json({message:"removed succesfully"})
    })
}