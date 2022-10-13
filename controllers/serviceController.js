const Service = require('../models/serviceModel')
const _ = require("lodash")
const formidable = require("formidable")
const fs = require("fs")

exports.serviceById = (req, res, next, id)=>{
    Service.findById(id).exec((err, service)=>{
        if(err || !service){
           return res.status(400).json({
                    err: "Service Does Not Found"
            })
        }
        req.service = service;
        next();
    })
}

exports.read = (req, res)=>{
    return res.json(req.service)
}


exports.serviceCreate = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                err: "Image can not be uploaded"
            })
        }
        let service = new Service(fields)
        if(files.serviceicon){
            service.serviceicon.data = fs.readFileSync(files.serviceicon.filepath)
            service.serviceicon.contentType = files.serviceicon.mimetype 
        }
        
        service.save((err, result)=>{
            if(err){
                    return res.status(400).json({
                        err
                    })
            }
            res.json(result)
        })
    })
}

exports.allservices = (req, res)=>{
    Service.find().exec((err, service)=>{
        if(err){
            return res.status(400).json({
                err: "Service Not Found"
            })
        }
        res.json(service)
    })
}

exports.update = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                err: "Image can not be uploaded"
            })
        }
        let service = req.service;
        service = _.extend(service, fields)

        if(files.serviceicon){
            service.serviceicon.data = fs.readFileSync(files.serviceicon.filepath)
            service.serviceicon.contentType = files.serviceicon.mimetype 
        }
        
        service.save((err, result)=>{
            if(err){
                    return res.status(400).json({
                        err
                    })
            }
            res.json(result)
        })
    })
 }


 exports.removeService = (req, res)=>{
    let service = req.service;
    service.remove((err, deletedservice)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            deletedservice,
            message: "Deleted Successfuly"
        })
    })
}