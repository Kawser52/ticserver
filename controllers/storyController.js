const Sstory = require('../models/storyModel')
const _ = require("lodash")
const formidable = require("formidable")
const fs = require("fs")



exports.storyById = (req, res, next, id)=>{
    Sstory.findById(id).exec((err, story)=>{
        if(err || !story){
           return res.status(400).json({
                    err: "story not not found"
            })
        }
        req.story = story;
        next();
    })
}

exports.read = (req, res)=>{
    req.story.spicture = undefined;
    return res.json(req.story)

}

exports.storyList = (req, res)=>{ 
    Sstory.find().exec((err, stories)=>{
        if(err){
            return res.status(400).json({
                err: "Story Not Found"
            })
        }
        res.json(stories)
    })
}

exports.createStory = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                err: "Image can not be uploaded"
            })
        }
        let story = new Sstory(fields)
        if(files.spicture){
            story.spicture.data = fs.readFileSync(files.spicture.filepath)
            story.spicture.contentType = files.spicture.mimetype 
        }
        
        story.save((err, result)=>{
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
        let story = req.story;
        story = _.extend(story, fields)

        if(files.spicture){
            story.spicture.data = fs.readFileSync(files.spicture.filepath)
            story.spicture.contentType = files.spicture.mimetype 
        }
        
        story.save((err, result)=>{
            if(err){
                    return res.status(400).json({
                        err
                    })
            }
            res.json(result)
        })
    })
}

exports.removeStory = (req, res)=>{
    let story = req.story;
    story.remove((err, deletestory)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            deletestory,
            message: "Deleted Successfuly"
        })
    })
}

exports.storyPicture = (req, res, next)=>{
    if(req.story.spicture.data){
        res.set("Content-Type", req.story.spicture.contentType)
        return res.send(req.story.spicture.data)
    }
    next();
}