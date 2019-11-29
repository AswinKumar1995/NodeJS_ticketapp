const express = require('express');
const commentController = require("./../controllers/commentController")
const appConfig = require("../../config/appConfig")

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion+"/comments"
    app.get(baseUrl+"/:ticketId/view",commentController.getCommentByBlogId)
    app.post(baseUrl+"/create",commentController.createComment)
}

module.exports = {
    setRouter : setRouter
}