const express = require("express")
const mongoose = require("mongoose")
const shortid = require('shortid')
const response = require("./../libs/responseLib")
const timeLib = require("./../libs/timeLib")
console.log(timeLib.now)
const check = require("./../libs/checkLib")
const logger = require("./../libs/loggerLib")

const TicketModel = mongoose.model("Ticket")

let getAllTicket = (req,res) => {
    TicketModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err,result) => {
            if(err){
                console.log(err)
                logger.error(err.message,"TicketController:getAllTicket",10)
                let apiResponse = response.generate(true,"Failed to get ticket Details",500,null)
                res.send(apiResponse)
            }
            else if(check.isEmpty(result)){
                console.log("No Ticket Found")
                logger.info("No ticket Found","TicketController: getAllTicket",10)
                let apiResponse = response.generate(true,"No Ticket Found",404,null)
                res.send(apiResponse)
            }
            else{
                let apiResponse = response.generate(false,"All Ticket Details Found",200,result)
                res.send(apiResponse)
            }
        })
}

let createTicket = (req,res) => {
    var today = timeLib.now();
    let ticketId = shortid.generate();
    let newTicket = new TicketModel({
        ticketId:ticketId,
        title:req.body.title,
        description:req.body.description,
        attachment:req.body.attachment,
        comments:req.body.comments,
        status:req.body.status,
        reporter:req.body.reporter,
        assignee:req.body.assignee,
        created:today,
        lastModified:today,
        reporterId : req.body.reporterId,
        assigneeId : req.body.assigneeId,
        
    })

    let watcherlist = (req.body.watcherlist != undefined && req.body.watcherlist != null && req.body.tags != "") ? req.body.watcherlist.split(",") : []
    newTicket.watcherlist = watcherlist
    newTicket.save((err,result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send(result)
        }
    })

}

let editTicket = (req,res) => {
    let options = req.body;
    console.log(options);
    TicketModel.update({'ticketId':req.params.ticketId},options,{multi:true}).exec((err,result) => {
        if(err) {
            console.log(err);
            let apiResponse = response.generate(true,"Error Occured",500,null)
            res.send(apiResponse)
        }

        else if(check.isEmpty(result)){
            console.log("No Ticket Found")
            let apiResponse = response.generate(true,"No Ticket Found",404,null)
            res.send(apiResponse)
        }
        else{
            res.send(result)
        }
    })
} // end edit ticket 

let viewByTicketId = (req,res) => {
    TicketModel.findOne({ 'ticketId': req.params.ticketId }, (err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, "Error Occured", 500, null)
            res.send(apiResponse)
        }
        else if (check.isEmpty(result)) {
            console.log("No Blog Found.")
            logger.info("No Blog Found.","BlogController : viewByBlogId",10)
            let apiResponse = response.generate(true, "No Ticket Found", 404, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.generate(false, "All Ticket Details are found", 200, result)
            res.send(apiResponse)
        }
    })
}

let removeUserIdFromWatchers = (req,res) => {
    TicketModel.findOne({'ticketId':req.params.ticketId},(err,result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, "Error Occured", 500, null)
            res.send(apiResponse)
        }
        else if (check.isEmpty(result)) {
            console.log("No Tickets found")
            let apiResponse = response.generate(true, "No Tickets found", 404, null)
            res.send(apiResponse)
        }
        else {
            removeUserId = req.params.userId
            console.log(result)
            result.watcherlist = result.watcherlist.filter(item => item !== removeUserId)
            result.save(function (err, result) {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, "Error Occured", 500, null)
                    res.send(apiResponse)
                }
                else {
                    console.log("Comments updated successfully")
                    res.send(result);
                }
            })
        }
    })

}

let addUserIdToWatchers = (req,res) => {
    console.log(req.params.ticketId)
    console.log(req.params.userId)
    TicketModel.findOne({'ticketId':req.params.ticketId},(err,result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, "Error Occured", 500, null)
            res.send(apiResponse)
        }
        else if (check.isEmpty(result)) {
            console.log("No Tickets found")
            let apiResponse = response.generate(true, "No Tickets found", 404, null)
            res.send(apiResponse)
        }
        else {
            console.log(result)
            console.log(result.watcherlist)
            result.watcherlist.push(req.params.userId)
            console.log(result.watcherlist)
            result.save(function (err, result) {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, "Error Occured", 500, null)
                    res.send(apiResponse)
                }
                else {
                    console.log("ticket updated successfully")
                    res.send(result);
                }
            })
        }
    })

}




module.exports = {
    getAllTicket:getAllTicket,
    createTicket:createTicket,
    editTicket:editTicket,
    viewByTicketId:viewByTicketId,
    removeUserIdFromWatchers:removeUserIdFromWatchers,
    addUserIdToWatchers:addUserIdToWatchers
}