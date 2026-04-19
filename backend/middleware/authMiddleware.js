const jwt=require("jsonwebtoken");

const protect=(req,res,next)=>{
    let token;

    //check token in headers and using bearer schema for stand auth
    if(req.headers.authorization && req.authorization.startsWith("Bearer")){
        try{
            //extract token : Autho: bearer <token_string>
            token = req.headers.authorization.split(" ")[1];

            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);

            //Attach user to request
            req.user=decoded.id;

            next();   //call next router or middleware

        }
        catch(error){
            return res.status(401).json({
                message: "Not authorized , token failed",
            });
        }
    }
    if(!token){
        return res.status(401).json({
            message:"Not authorized ,no token,
        });
    }
};

module.exports=protect; 