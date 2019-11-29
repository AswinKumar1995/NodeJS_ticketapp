const express = require("express");
const mongoose = require('mongoose');
const shortid = require("shortid");
const response = require("./../libs/responseLib")
const timeLib = require("./../libs/timeLib")
const check = require("./../libs/checkLib")
const logger = require("./../libs/loggerLib")

const NotificationModel = mongoose.model("Notifications")

let getNotificationsByUserId = (req,res) =>{
    NotificationModel.find({'userId':req.params.userId})
    .select("-__v -_id")
    .lean()
    .exec((err,result) => {
        if(err){
            console.log(err)
            logger.error(err.message,"NotificationController:getNotificationsByUserId",10)
            let apiResponse = response.generate(true,"Failed to get notification Details",500,null)
            res.send(apiResponse)
        }
        else if(check.isEmpty(result)){
            console.log("No Notifications Found")
            logger.info("No  Notifications Found","NotificationController:getNotificationsByUserId",10)
            let apiResponse = response.generate(true,"No notifications Found",404,null)
            res.send(apiResponse)
        }
        else{
            let apiResponse = response.generate(false,"All Notifications Details Found",200,result)
            res.send(apiResponse)
        }
    })
}


let getUnseenNotificationsByUserId = (req,res) => {
    NotificationModel.find({'userId':req.params.userId,"seen":false})
    .select("-__v -_id")
    .lean()
    .exec((err,result) => {
        if(err){
            console.log(err)
            logger.error(err.message,"NotificationController:getNotificationsByUserId",10)
            let apiResponse = response.generate(true,"Failed to get notification Details",500,null)
            res.send(apiResponse)
        }
        else if(check.isEmpty(result)){
            console.log("No Notifications Found")
            logger.info("No  Notifications Found","NotificationController:getNotificationsByUserId",10)
            let apiResponse = response.generate(true,"No notifications Found",404,null)
            res.send(apiResponse)
        }
        else{
            let apiResponse = response.generate(false,"All Notifications Details Found",200,result)
            res.send(apiResponse)
        }
    })
    
}

let createNotification = (req,res) => {
    var today = timeLib.now()
    let notificationId = shortid.generate()
    let newNotification = new NotificationModel({
        notificationId:notificationId,
        ticketId:req.body.ticketId,
        userId:req.body.userId,
        userName:req.body.userName,
        notification:req.body.notification,
        seen:false,
        created:today
    })
    newNotification.save((err,result) => {
        if(err){
            console.log(error)
            res.send(error)
        }
        else{
            res.send(result)
        }
    })
}

let markNotificationAsSeen = (req,res) => {
    NotificationModel.updateMany({'userId':req.params.userId,"seen":false},{$set:{'seen':true}},(err,result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, "Error Occured", 500, null)
            res.send(apiResponse)
        }
        else if (check.isEmpty(result)) {
            console.log("No Notifications found")
            let apiResponse = response.generate(true, "No Notifications found", 404, null)
            res.send(apiResponse)
        }
        else {
            console.log(result)
            let apiResponse = response.generate(false,"All Notifications Details Found",200,result)
            res.send(apiResponse)
            // for(let record of result){
            //     record["seen"] = true
            // }
            // console.log(result)
            // result.save(function (err, result) {
            //     if (err) {
            //         console.log(err)
            //         let apiResponse = response.generate(true, "Error Occured", 500, null)
            //         res.send(apiResponse)
            //     }
            //     else {
            //         console.log("Comments updated successfully")
            //         res.send(result);
            //     }
            // })
        }


    })
}

module.exports = {
    getNotificationsByUserId:getNotificationsByUserId,
    createNotification:createNotification,
    markNotificationAsSeen:markNotificationAsSeen,
    getUnseenNotificationsByUserId:getUnseenNotificationsByUserId
}