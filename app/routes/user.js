const express = require("express");
const router = express.Router()
const userController = require("./../controllers/userController")
const appConfig = require("./../../config/appConfig")
const auth = require("./../middlewares/auth")
 
let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + "/users";
    //defining routes
    app.get(`${baseUrl}/:userId/details`,auth.isAuthorised,userController.getSingleUser);
    app.get(`${baseUrl}/:userId/edit`,auth.isAuthorised,userController.editUser);
    app.post(`${baseUrl}/:userId/delete`,auth.isAuthorised,userController.deleteUser);
    app.get(`${baseUrl}/view/all`,userController.getAllUser);
    app.post(`${baseUrl}/signup`,userController.signUpFunction);
    app.post(`${baseUrl}/login`,userController.loginFunction);
    app.post(`${baseUrl}/:userId/logout`,auth.isAuthorised,userController.logout);
    
    // app.use('/', router);
}
 
module.exports = {
    setRouter:setRouter
}