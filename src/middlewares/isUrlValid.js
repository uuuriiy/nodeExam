const urlMiddleware = async(req, res, next) => {
    try {
        const url = req.url;
        const urlRegExp = /\d/;

        if(!urlRegExp.test(url)) return next(res.status(404).json({message: "userId is required"}))

        next();
    } catch (e) {
        next(e);
    }
}

module.exports = urlMiddleware;
