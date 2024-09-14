const express = require('express');
const app = express();
const cookieParse = require('cookie-parser');
const { connetToDb } = require('./connect');
const URL = require('./model/url');
const PORT = 8000;
const { restrictedLogginUserOnly } = require('./middleware/auth');

connetToDb("mongodb://localhost:27017/url-shortner").then(() => {

    console.log('connect to the db');
}).catch((err) => {
    console.log('somthing went wrong');
});


const urlRoute = require('./route/url');
const userRoute = require('./route/usersRoute');
const { cookie } = require('request');

app.use(express.json());
app.use(cookieParse());


app.use("/url", restrictedLogginUserOnly, urlRoute);
app.use("/user", userRoute);
app.get("/:shortId", async (req, res) => {
    console.log("shorinder");
    const shortid = req.params.shortId;
    console.log(shortid)
    if (!shortid) return res.status(400).json({ message: "shorid_not found" });

    const result = await URL.findOneAndUpdate({ shortId: shortid }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    });

    console.log(result);
    res.redirect(result.redirectUrl);

});


app.listen(PORT, () => {
    console.log(`running on the PORT :${PORT}`);
})