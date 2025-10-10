const Project=require('../models/projectModel');
exports.create=async(req,res)=>{
    const {name}=req.body;
    const userId=req.user;

    const newproject=await Project.create({
        name,
        users:[userId]
    })
    return res.status(201).json({newproject})

}

exports.findAll=async(req,res)=>{

    const alldata=await Project.find({});
    return res.status(201).json({message:"data",alldata})
}