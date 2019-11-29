const express = require("express")
const notificationController = require("./../controllers/notificationController")
const appConfig = require("../../config/appConfig")

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + "/notifications"
    app.get(baseUrl+"/:userId/view",notificationController.getNotificationsByUserId)
    app.post(baseUrl+"/create",notificationController.createNotification)
    app.get(baseUrl+"/:userId/seen",notificationController.markNotificationAsSeen)
    app.get(baseUrl+"/:userId/dashboard",notificationController.getUnseenNotificationsByUserId)
}

module.exports = {
    setRouter:setRouter
}