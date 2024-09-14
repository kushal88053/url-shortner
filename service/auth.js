
// it is session based 

// const sessionIdToUserMap =  new Map() ; 

// function setUser(id , user)
// {
//     sessionIdToUserMap.set(id , user) ; 
// }

// function getUser(id)
// {
//     return sessionIdToUserMap.get(id) ; 
// }


const jwt = require('jsonwebtoken');
const Secret = "kushalPatel";

function setUser(id, user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    },
        Secret
    );
}

function getUser(token) {
    if (token) {
        try {
            return jwt.verify(token, Secret);  // Use token instead of id
        } catch (err) {
            console.error('Invalid token:', err.message);
            return null;
        }
    }
    return null;
}

module.exports = {
    setUser, getUser
};
