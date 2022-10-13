const Course = require('../models/courseModel')
const Category = require('../models/categoryModel')
const fs = require("fs")
const _ = require("lodash")
const formidable = require("formidable")


exports.courseById = (req, res, next, id)=>{
    Course.findById(id).exec((err, course)=>{
        if(err || !course){
           return res.status(400).json({
                    err: "Product not found"
            })
        }
        req.course = course;
        next();
    })
}

exports.read = (req, res)=>{
    req.course.coursethumbnail = undefined;
    return res.json(req.course)

}

exports.createCourse = (req, res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                err: "Image can not be uploaded"
            })
        }
        let course = new Course(fields)
        if(files.coursethumbnail){
            course.coursethumbnail.data = fs.readFileSync(files.coursethumbnail.filepath)
            course.coursethumbnail.contentType = files.coursethumbnail.mimetype
        }

        course.save((err, result)=>{
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
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                err: "Image can not be uploaded"
            })
        }

        let course = req.course;
        course = _.extend(course, fields)


        if(files.coursethumbnail){
            course.coursethumbnail.data = fs.readFileSync(files.coursethumbnail.filepath)
            course.coursethumbnail.contentType = files.coursethumbnail.mimetype
        }

        course.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    err
                })
            }
            res.json(result)
        })  
    })
}

exports.removeCourse = (req, res)=>{
    let course = req.course;
    course.remove((err, deletedCourse)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            deletedCourse,
            message: "Deleted Successfuly"
        })
    })
}

exports.list = (req, res)=>{ 
    Course.find().populate("coursecat").exec((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "Course are Not Found"
            })
        }
        res.json(data)
    })
}

exports.list = (req, res)=>{ 
    Course.find().populate("coursecat").exec((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "Course are Not Found"
            })
        }
        res.json(data)
    })
}

exports.web = (req, res)=>{ 
    Course.find({coursecat: "633524fabf4ea875b2b99b58", options: {
        limit: 3
      }}).populate("coursecat").exec((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "Course are Not Found"
            })
        }
        res.json(data)
    })
}

exports.graph = (req, res)=>{ 
    Course.find({coursecat: "63352ad59cbccce2b8793244", options: {
        limit: 1
      }}).populate("coursecat").exec((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "Course are Not Found"
            })
        }
        res.json(data)
    })
}


exports.digital = (req, res)=>{ 
    Course.find({coursecat: "633be91b16c8ce3637c0c657", options: {
        limit: 3
      }}).populate("coursecat").exec((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "Course are Not Found"
            })
        }
        res.json(data)
    })
}


exports.thumbnail = (req, res, next)=>{
    if(req.course.coursethumbnail.data){
        res.set('Content-Type', req.course.coursethumbnail.contentType)
        return res.send(req.course.coursethumbnail.data)
    }
    next();
}