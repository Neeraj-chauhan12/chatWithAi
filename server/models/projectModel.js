const mongoose=require('mongoose')

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        trim:true
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

module.exports=mongoose.model("Project",projectSchema)