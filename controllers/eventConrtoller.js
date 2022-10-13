const Event = require('../models/eventModel')
const _ = require("lodash")
const formidable = require("formidable")
const fs = require("fs")


exports.eventById = (req, res, next, id)=>{
    Event.findById(id).exec((err, event)=>{
        if(err || !event){
           return res.status(400).json({
                    err: "Event not not found"
            })
        }
        req.event = event;
        next();
    })
}

exports.read = (req, res)=>{
    req.event.eventthumbnail = undefined;
    return res.json(req.event)
}


exports.createEvent = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                err: "Image can not be uploaded"
            })
        }
        let event = new Event(fields)
        if(files.eventthumbnail){
            event.eventthumbnail.data = fs.readFileSync(files.eventthumbnail.filepath)
            event.eventthumbnail.contentType = files.eventthumbnail.mimetype 
        }
        
        event.save((err, result)=>{
            if(err){
                    return res.status(400).json({
                        err
                    })
            }
            res.json(result)
        })
    })
}



exports.eventlist = (req, res)=>{ 
    Event.find().exec((err, event)=>{
        if(err){
            return res.status(400).json({
                err: "Blog Not Found"
            })
        }
        res.json(event)
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
        let event = req.event;
        event = _.extend(event, fields)

        if(files.eventthumbnail){
            event.eventthumbnail.data = fs.readFileSync(files.eventthumbnail.filepath)
            event.eventthumbnail.contentType = files.eventthumbnail.mimetype 
        }
        
        event.save((err, result)=>{
            if(err){
                    return res.status(400).json({
                        err
                    })
            }
            res.json(result)
        })
    })
}


exports.removeEvent = (req, res)=>{
    let event = req.event;
    event.remove((err, deletedevent)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            deletedevent,
            message: "Deleted Successfuly"
        })
    })
}

exports.eventImages = (req, res, next) =>{
    if(req.event.eventthumbnail.data){
        res.set("Content-Type", req.event.eventthumbnail.contentType)
        return res.send(req.event.eventthumbnail.data)
    }
    next();
}
