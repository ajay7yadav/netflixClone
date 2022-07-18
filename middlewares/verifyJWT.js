const util = require('../utils/helper');
const jwt = util.jwt;
const Key = util.key;

const verifyToken = (req, res, next) =>{
    const header = req.headers['x-access-token'];
    if(!header){
        res.status(401).send({
            message : ' enter accessToken '
        });
        return;
    }
    jwt.verify(header,Key,(err, decodeToken)=>{
        if(err){
            res.status(401).send({
                message : ' Token is not valid, Enter valid accessToken'
            });
            return;
        }
        req._id = decodeToken._id;
        next();
    });
}

module.exports = {
    token : verifyToken
}