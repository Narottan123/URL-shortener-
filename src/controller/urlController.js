const urlModel = require("../models/urlModel");
const shortid = require('shortid');
const validUrl = require('valid-url');
const nodeCache = require('node-cache');
const Cache = new nodeCache();

const createShortUrl = async (req, res) => {
    try {
        let longUrl = req.body.longUrl;
        if (!longUrl) {
            return res.status(400).send({ status: false, message: "Must add any url" })
        }
        if (typeof longUrl !== 'string') {
            return res.status(400).send({ status: false, message: "type of string" })
        }
        let protocol = req.protocol;
        let rawHeaders = req.rawHeaders;
        let hostName = req.headers.host;

        if (!validUrl.isUri(longUrl)) {
            return res.status(400).send({ status: false, message: "Not a valid url" })
        }
        longUrl = longUrl.toLowerCase();

        let code = shortid.generate().toLowerCase();

        let data = { longUrl: longUrl, urlCode: code, shortUrl: `${protocol}://${hostName}/${code}` }
        let result = await urlModel.create(data);
        let my = { longUrl: result.longUrl, shortUrl: result.shortUrl, urlCode: result.urlCode }
        return res.status(201).send({ status: true, data: my })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
const getUrl = async (req, res) => {
    let cacheKey = 'urlshortner';
    const cacheData = Cache.get(cacheKey);
    if (cacheData) {
        console.log("Data retrieved from cache")
        res.status(200).send({ status: true, message: "Data retrieve successfully", cacheData })
    }
    else {
        try {
            let code = req.params.urlCode.toLowerCase();
            if (!code) {
                return res.status(400).send({ status: false, message: "must send url" })
            }
            if (!shortid.isValid(code)) {
                return res.status(400).send({ status: false, message: "Not a valid url" })
            }
            let data = await urlModel.findOne({ urlCode: code })
            if (!data) {
                return res.status(404).send({ status: false, message: "url code not found" })
            }

            else {
                console.log("Data retrieve from Database")
                Cache.set(cacheKey,data);
                //console.log(data.longUrl);
                return res.status(302).redirect(data.longUrl);
            }
        }
        catch {
            res.status(500).send({ status: false, message: err.message })
        }
    }
}

module.exports = { createShortUrl, getUrl }