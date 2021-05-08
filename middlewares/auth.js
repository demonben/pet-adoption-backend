const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ message: 'must provide an authorization header' })
        return;
    }
    
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'secret', async (err, decoded) => {
     if(err){
         res.status(401).send({ message: 'Invalid token' })
         return;
     }
     req.user =decoded
        // var decoded1 = jwt_decode(token)
        // console.log("info", decoded1)
     next();
})}

exports.auth = auth