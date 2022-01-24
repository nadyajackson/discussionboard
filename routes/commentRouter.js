const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

//Get All
commentRouter.get("/" , (req, res, next) => {
    Comment.find((err, commentsList) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(commentsList)
    })
})

//Post One
commentRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

//Get One
commentRouter.get("/:commentId", (req, res, next) => {
    Comment.findOne({_id: req.params.commentId}, (err, foundComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundComment)
    })
})

//Delete One
commentRouter.delete("/:commentId", (req,res, next) => {
    Comment.findOneAndDelete( { _id: req.params.commentId}, (err, deletedComment)  =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted comment ${deletedComment}`)
    })
})

//Update One
commentRouter.put("/:commentId", (req,res, next) => {
    Comment.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, (err, updatedItem) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedItem)
    })
})

// Get one by search term 'issue=*****'
commentRouter.get('/search/byIssue/:issueId', (req, res, next) =>{
    Comment.find(
        {issue: req.params.issueId},
        (err, comments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(comments)
        }
    )
})


//get by user
commentRouter.get('/search/byUser/:userId', (req, res, next) =>{
    Comment.find({user : req.params.userId},
        (err, comments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(comments)
        }
    )
})
module.exports = commentRouter