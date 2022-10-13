const Category = require('../models/categoryModel')

exports.addcategory = (req, res)=>{
    console.log("req.body", req.body)
    const cat = new Category(req.body)
    cat.save((err, data)=>{
        if(err){
            return res.status(400).json({err})
        }
        res.send({
            data
        })
    })
}

exports.catById = (req, res, next, id)=>{
    Category.findById(id).exec((err, category)=>{
          if(err){
            return res.status(400).json({
                err
            })
          }
          req.category = category
          next();
    })
}

exports.read =(req, res)=>{
    return res.json(req.category)
}

exports.list = (req, res)=>{
    Category.find().exec((err, data)=>{
        if(err){
            return res.status(400).json({
                err:"Data not found"
            })
        }
        res.json(data)
    })
}

exports.update = (req, res) =>{
   const category = req.category;
   category.title = req.body.title;
   category.save((err, data)=>{
    if(err){
        return res.status(400).json({
            err:"Data not found"
        })
    }
    res.json(data)
   })
}

exports.catRemove = (req, res)=>{
    const category = req.category;
    category.remove((err, data)=>{
        if(err){
            return res.status(400).json({
                err:"Data not found"
            })
        }
        res.json({
            data,
            message: "Deleted Sucessfuly"
        })
    })
}


