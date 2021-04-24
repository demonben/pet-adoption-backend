const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ message: 'must provide an authorization header' })
        return;
    }
    const token = authorization.replace('Bearer', '');
    console.log(token);
    jwt.verify(token, 'secret', async (err, decoded) => {
        console.log(decoded)
     if(err){
         res.status(401).send({ message: 'Invalid token' })
         return;
     }
     req.user =decoded
     next();
})}

exports.auth = auth