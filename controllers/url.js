const ShortUniqueId = require('short-unique-id');

const URL = require('../models/url');


// Handlers
const handleGenerateShortUrl = async (req, res) => {
    const body = req.body;
    if (!body.url) {
        res.status(400).json({ error: 'url is required' });
        return;
    }
    const uid = new ShortUniqueId({ length: 6 });
    const shortID = uid.rnd();

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });
    return res.render('home', {
        Id: shortID,
    });
}

const handleGetRedirected = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now(),
                },
            }
        }
    );
    return res.redirect(entry.redirectUrl);         // shortId to redirectId
};

const handleGetAnalyti = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

// Exporting the handlers
module.exports = {
    handleGenerateShortUrl,
    handleGetRedirected,
    handleGetAnalyti,
};