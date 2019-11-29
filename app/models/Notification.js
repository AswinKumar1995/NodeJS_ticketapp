const mongoose = require("mongoose")
Schema = mongoose.Schema

let notificationSchema = new Schema({
    notificationId:{
        type:String,
        unique:true
    },
    userId:{
        type:String,
        default:""
    },
    ticketId:{
        type:String,
        default:""
    },
    userName:{
        type:String,
        default:""
    },
    notification:{
        type:String,
        default:""
    },
    seen:{
        type:Boolean,
        default:false
    },
    created:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Notifications",notificationSchema)