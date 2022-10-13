const Blog = require('../models/blogModel')
const _ = require("lodash")
const formidable = require("formidable")
const fs = require("fs")



exports.blogById = (req, res, next, id)=>{
    Blog.findById(id).exec((err, blog)=>{
        if(err || !blog){
           return res.status(400).json({
                    err: "Blog not not found"
            })
        }
        req.blog = blog;
        next();
    })
}

exports.read = (req, res)=>{
    req.blog.blogthumnail = undefined;
    return res.json(req.blog)

}

exports.bloglist = (req, res)=>{ 
    Blog.find().exec((err, blogs)=>{
        if(err){
            return res.status(400).json({
                err: "Blog Not Found"
            })
        }
        res.json(blogs)
    })
}

exports.createBlog = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                err: "Image can not be uploaded"
            })
        }
        let blog = new Blog(fields)
        if(files.blogthumnail){
            blog.blogthumnail.data = fs.readFileSync(files.blogthumnail.filepath)
            blog.blogthumnail.contentType = files.blogthumnail.mimetype 
        }
        
        blog.save((err, result)=>{
            if(err){
                    return res.status(400).json({
                        err
                    })
            }
            res.json(result)
        })
    })
}

exports.update = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                err: "Image can not be uploaded"
            })
        }
        let blog = req.blog;
        blog = _.extend(blog, fields)

        if(files.blogthumnail){
            blog.blogthumnail.data = fs.readFileSync(files.blogthumnail.filepath)
            blog.blogthumnail.contentType = files.blogthumnail.mimetype 
        }
        
        blog.save((err, result)=>{
            if(err){
                    return res.status(400).json({
                        err
                    })
            }
            res.json(result)
        })
    })
}

exports.removeBlog = (req, res)=>{
    let blog = req.blog;
    blog.remove((err, deletedblog)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            deletedblog,
            message: "Deleted Successfuly"
        })
    })
}

exports.blogthumbnail = (req, res, next)=>{
    if(req.blog.blogthumnail.data){
        res.set("Content-Type", req.blog.blogthumnail.contentType)
        return res.send(req.blog.blogthumnail.data)
    }
    next();
}