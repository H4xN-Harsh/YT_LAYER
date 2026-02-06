const pool = require('../config/db');
const jwt = require('jsonwebtoken');

const {hashPass}=require('../utils/hash');
const { ACCESS_SECRET,REFRESH_SECRET,ACCESS_EXPIRE,REFRESH_EXPIRE}=require('../config/jwt');


exports.register=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;

        // check user 
        const userExists = await pool.query(
            "select id from users where email = $1",
            [email]
        );
        if(userExists.rows.length>0){
            return res.status(409).json({message:"email already registered "});
        }

        // hashing 
        const hashedPassword = await hashPass(password);

        // save user
        const newUser = await pool.query(
            `insert into users (name,email,password,role)
            values ($1 ,$2, $3, $4)
            returning id, email,role`,
            [name,email,hashedPassword,role]
        );
        const user = newUser.rows[0];

        // creating token 
        const accessToken = jwt.sign(
            {id:user.id,role:user.role},ACCESS_SECRET,{expiresIn:ACCESS_EXPIRE}
        );

        const refreshToken = jwt.sign(
            {id:user.id},REFRESH_SECRET,{expiresIn:REFRESH_EXPIRE}
        );


        // send respones
        res.status(201).json({
            message:"user registered successfully",
            accessToken,refreshToken
        });



    }catch(error){
        console.error(error);
        res.status(500).json({message:"server having some issue"})
    }
}