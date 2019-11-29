const express = require('express')
const ticketController = require("./../controllers/ticketController")
const appConfig = require("../../config/appConfig")

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + "/tickets"
    app.get(baseUrl+"/all",ticketController.getAllTicket)
    app.get(baseUrl+"/:ticketId/view",ticketController.viewByTicketId)
    app.put(baseUrl+"/:ticketId/edit",ticketController.editTicket)
    app.post(baseUrl+"/create",ticketController.createTicket)
    app.get(baseUrl+"/:ticketId/addWatcher/:userId",ticketController.addUserIdToWatchers)
    app.get(baseUrl+"/:ticketId/removeWatcher/:userId",ticketController.removeUserIdFromWatchers)

}

module.exports = {
    setRouter:setRouter
}