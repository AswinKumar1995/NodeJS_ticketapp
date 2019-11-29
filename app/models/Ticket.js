const mongoose = require("mongoose");
Schema = mongoose.Schema;

let ticketSchema = new Schema({
    ticketId : {
        type:String,
        unique:true
    },
    title : {
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    attachment:{
        type:String,
        default:""
    },
    comments:{
        type:String,
        default:""
    },
    status:{
        type:String,
        default:""
    },
    reporter:{
        type:String,
        default:""
    },
    assignee:{
        type:String,
        default:""
    },
    watcherlist:[],
    created:{
        type:Date,
        default:Date.now
    },
    lastModified:{
        type:Date,
        default:Date.now
    },
    reporterId:{
        type:String,
        default:""
    },
    assigneeId:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model("Ticket",ticketSchema)