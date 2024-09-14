const shortid = require('shortid');

const url = require('../model/url');


async function handleGenerateNewShortURL(req, res) {

    console.log('generator')
    const shortId = shortid.generate();
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "url not found" });
    }

    const result = await url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    res.status(200).json({ msg: "successfully message send ", id: result._id, shortId: shortId });
}

async function handleAnalitic(req, res) {

    console.log('analytic');
    const shortId = req.params.shortId;

    if (!shortId) return res.status(400).json({ error: "shortId not found" });



    if (result) {
        res.status(200).json({ Totoalclick: result.visitHistory.length, visitHistory: result.visitHistory });
    }
    else {
        res.status(400).json({ error: "invalid Short Code" });
    }

}

async function handleGetAllUrl(req, res) {
    try {
        const result = await url.find({ createdBy: req.user._id });

        console.log(Array.isArray(result)) ;

        const result2 = result.map((row) => {
            return {
                _id : row._Id , 
                shortId : row.shortId ,
                redirectUrl : row.redirectUrl ,
                visitCount: row.visitHistory.length,  
            };
        });

        result2.forEach(row => delete row.visitHistory);

        res.status(200).json(result2);

    } catch (error) {

        res.status(400).json({ error: "Invalid Short Code" });
    }
}


module.exports = { handleGenerateNewShortURL, handleAnalitic, handleGetAllUrl }; 