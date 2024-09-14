const User = require('../model/users')
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser } = require('../service/auth');

async function handletheSignUp(req, res) {

    const { user, email, password } = req.body;

    if (!(user || email || password)) {
        return res.status(400).json({ error: " data is missing " });
    }

    const check_email = await User.findOne({ email });

    if (!check_email) {
        const result = await User.create({
            user, email, password
        })

        if (result) {
            return res.status(200).json({ msg: "success", id: result._id });
        }
    }


    return res.status(403).json({ 'error': "email is already exist .." });
}


async function handleLogin(req, res) {

    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).json({ 'error': " please enter valid password" });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
        return res.status(403).json({ error: "invalid id " });
    }
   // const sessionId  = uuidv4();

     const  sessionId =  setUser(1,user);
    res.cookie({ uid: sessionId });
    return res.status(200).json({ success: "successfuly get the uid ", uid: sessionId ,getUser : getUser(sessionId) }) ;

}

module.exports = { handletheSignUp, handleLogin };