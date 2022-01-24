const express = require('express')
const publicRouter = express.Router()
const Comment = require('../models/comment.js')
const Issue = require('../models/issue')

publicRouter.get("/", (req, res, next) => {
    Issue.find((err, issueList) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issueList)
    })
})

publicRouter.get('/search/byIssue/:issueid', (req, res, next) =>{
    console.log(req.params.issueid, "from Router")
    Comment.find(
        {issue: req.params.issueid},
        (err, comments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(comments)
        }
    )
})

module.exports = publicRouter