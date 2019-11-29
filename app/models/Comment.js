const mongoose = require("mongoose");
Schema = mongoose.Schema

let commentSchema = new Schema({
    commentId:{
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
    comment:{
        type:String,
        default:""
    },
    created:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Comments",commentSchema)