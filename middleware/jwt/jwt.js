const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.verify = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];

    if(token) {

        try {

            let decoded = jwt.decode(token, SECRET_KEY);

            if(decoded.exp < Date.now()) {
                return res.status(401).send('Token expired');
            }

            req.user = decoded;
            return next();

            
        } catch (error) {
            return res.status(401).send('Token error');
        }

    } else {
        return res.status(401).send('No token provided');
    }

}