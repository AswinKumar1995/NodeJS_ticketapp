const express = require("express");
const mongoose = require('mongoose');
const shortid = require("shortid");
const response = require("./../libs/responseLib")
const timeLib = require("./../libs/timeLib")
const check = require("./../libs/checkLib")
const logger = require("./../libs/loggerLib")

const CommentModel = mongoose.model("Comments")

let getCommentByBlogId = (req,res) => {
    CommentModel.find({ 'ticketId': req.params.ticketId })
        .select('-__v -_id')
        .lean()
        .exec((err,result) =>{
            if(err){
                console.log(err)
                logger.error(err.message,"CommentController:getCommentByBlogId",10)
                let apiResponse = response.generate(true,"Failed to get comment Details",500,null)
                res.send(apiResponse)
            }
            else if(check.isEmpty(result)){
                console.log("No Comments Found")
                logger.info("No  Comments Found","CommentController:getCommentByBlogId",10)
                let apiResponse = response.generate(true,"No Comments Found",404,null)
                res.send(apiResponse)
            }
            else{
                let apiResponse = response.generate(false,"All Comment Details Found",200,result)
                res.send(apiResponse)
            }
        })
}

let createComment = (req,res) => {
    var today = timeLib.now()
    let commentId = shortid.generate()
    let newComment = new CommentModel({
        commentId:commentId,
        ticketId:req.body.ticketId,
        userId:req.body.userId,
        userName:req.body.userName,
        comment:req.body.comment,
        created:today
    })

    newComment.save((err,result) => {
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
}

module.exports = {
    getCommentByBlogId:getCommentByBlogId,
    createComment:createComment
}