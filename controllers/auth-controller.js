const express=require("express")
const router=require("../routers/auth-route")
const User=require("../models/user-model")

const home=(req,res)=>{
    try{
        res.status(200).send("Auth successful!")
    }catch(error){
        res.status(404).send("Page not found!");
    }
};

const register=async(req,res)=>{
    try{
        // console.log(req.body);

        //destructure the required data
        const {username,email,phone,password}=req.body;

        //find user with email using findOne() 
        const userExists=await User.findOne({email});

        //check if user exists
        if(userExists){
            return res.status(400).json({msg:"User already exists!"});
        }

        const userCreated=await User.create({username,email,phone,password});
        res.status(201).json({msg:"Registeration successful!",
                            token:await userCreated.generateToken(),
                            userId:userCreated._id.toString()});
        
    }catch(error){
        res.status(404).send("Not registered!");
    }
};

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //check if user exists by email
        const userExists=await User.findOne({email});
        if(!userExists){
            return res.status(400).json({msg:"Invalid credentials"})
        }
        //check password using compare in bcrypt
        const user=await userExists.checkPassword(password);
        if(user){
            res.status(200).json({
                msg:"Login successful",
                token:await userExists.generateToken(),
                userId:userExists._id.toString(),
                // isAdmin:userExists.isAdmin,
            })
        }else{
            //401 --> unauthorized error
            res.status(401).json({msg:"Invalid email or password"})
        }
    } catch (error) {
        res.status(500).send("Internal server error")
    }
};

const user=async(req,res)=>{
    try{
        const userData=req.user;
        console.log(userData);
        return res.status(200).json({userData});
    }catch(error){
        console.log(`error from the user route ${error}`);
    }
}

module.exports={home,register,login,user};