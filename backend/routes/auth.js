const express=require('express');
const User=require('../modules/User')
const router=express.Router()
const {body, validationResult}=require('express-validator');
var bcryptjs=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetchuser=require('../fetch/Fetchuser');
const jwt_key='anjalipsk@12345';

router.post('/createuser',
[
    body('name','enter valid name').isLength({min:3}),
    body('email','enter valid emailid').isEmail(),
    body('password','enter password has min length is 8').isLength({min:8}),
],
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(404).json({errors:errors.array()});
        }
        var user=await User.findOne({email:req.body.email});
        if(user)
        {
            success=false;
            return res.status(404).json({error:"sorry already exist"})
        }
        const salt=await bcryptjs.genSalt(10);
        secPass=await bcryptjs.hash(req.body.password,salt);
        var user=await User.findOne({email:req.body.email});
        if(user)
        {
            return res.status(404).json({error:"sorry"})
        }
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass,
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,jwt_key);
        console.log(authtoken);
        success=true;
        res.json({success,authtoken});
        // res.json(user)

        // res.json({authtoken})
        
    //     .then(user=>res.json(user))
    //     .catch(err=>{console.log(err)})
    //     res.json({error:"please enter valid date"})

    // console.log(req.body)
    // const user=User(req.body)
    // user.save()
    // res.send(req.body)
   
})

//login user api/auth/login

router.post('/login',
[
    body('email','enter valid emailid').isEmail(),
    body('password','enter password has min length is 8').isLength({min:8}),
],
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(404).json({errors:errors.array()});
        }
        const {email,password}=req.body;
        try{
            var user=await User.findOne({email});
            if(!user)
            {
                return res.status(404).json({errors:'sorry user does not exist'});
            }
            const pass=await bcryptjs.compare(password,user.password);
            if(!pass)
            {
                success=false;
                return res.status(404).json({success,error:'sorry user does not exist'});
            }
            const data={
                user:{
                    id:user.id
                }
            }
            const authtoken=jwt.sign(data,jwt_key);
            success=true;
            res.json({ success,authtoken});
        }
        catch(error){
            console.log(error.message);
            res.status(500).send('internal servererror');
        }
    })

//login user api/auth/getuser

router.post('/getuser',fetchuser,async(req,res)=>{
    try{
        userId=req.user.id;
        const user=await User.findById(userId)
        res.send(user)
    }catch (error){
        console.log(error.message);
        res.status(400).send('Internal server error')
    }
})


module.exports=router




