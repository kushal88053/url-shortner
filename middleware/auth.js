const { getUser } = require('../service/auth')


// function checkForAuthentication(req, res, next) {


//     const tokenCookie = req.cookies?.token;
//     req.user = null ; 
//     //req.user = getUser(userId);

//     if(!tokenCookie) return res.status(403).json({ error : "access denied or token not found"}) ;
   
//     const token = tokenCookie ; 
//     const user  = getUser(token) ; 

//     return next() ; 

// }

async function restrictedLogginUserOnly(req, res, next) {

    //  console.log(req) ; 
    const userId = req.cookies?.uid;
    console.log(userId);
    user = getUser(userId);

    if (user) {
        result = { _id: user._id, email: user.email };
        req.user = result;
        next();
    }
    else {
        return res.status(400).json({ error: "invalid tokon" });

    }

}


module.exports = { restrictedLogginUserOnly }; 