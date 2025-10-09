const mongoose=require('mongoose')

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

module.exports=mongoose.model("Project",projectSchema)