const Project = require('../models/projectModel')
const _ = require("lodash")
const formidable = require("formidable")
const fs = require("fs")


exports.projectById = (req, res, next, id)=>{
    Project.findById(id).exec((err, project)=>{
        if(err || !project){
           return res.status(400).json({
                err: "Project not found"
            })
        }
        req.project = project;
        next();
    })
}

exports.read = (req, res)=>{
    req.project.pthumbnail = undefined;
    return res.json(req.project)
}

exports.projectlist = (req, res)=>{ 
    Project.find().exec((err, project)=>{
        if(err){
            return res.status(400).json({
                err: "Blog Not Found"
            })
        }
        res.json(project)
    })
}



exports.createProject = (req, res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                err: "Image can not be uploaded"
            })
        }
        let project = new Project(fields)
        if(files.pthumbnail){
            project.pthumbnail.data = fs.readFileSync(files.pthumbnail.filepath)
            project.pthumbnail.contentType = files.pthumbnail.mimetype
        }
        project.save((err, result)=>{
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
        let project = req.project;
        blog = _.extend(project, fields)

        if(files.pthumbnail){
            project.pthumbnail.data = fs.readFileSync(files.pthumbnail.filepath)
            project.pthumbnail.contentType = files.pthumbnail.mimetype
        }
        project.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    err
                })
            }
            res.json(result)
        })
        
    })
}



exports.removeProject = (req, res)=>{
    let project = req.project;
    project.remove((err, deletedproject)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            deletedproject,
            message: "Deleted Successfuly"
        })
    })
}


exports.projectthumnail = (req, res, next)=>{
    if(req.project.pthumbnail.data){
        res.set("Content-Type", req.project.pthumbnail.contentType)
        return res.send(req.project.pthumbnail.data)
    }
    next();
}