const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if(!toekn) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKNE_SECTRET);
        req.user= verified;
    }catch(err){
        res.status(400).send('Invalid token');
    }
}