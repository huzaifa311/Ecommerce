const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
    try {
        // const headers = req.headers["authorization"]
        console.log(req.headers["authorization"]);

        if (req.headers["authorization"]) {
            const token = req.headers["authorization"].split(' ');
            console.log(token[1]);
            const isVerify = jwt.verify(token[1], 'PRIVATEKEY')
            console.log('isVerify ', isVerify);

            if (isVerify) {
                next()
            } else {
                res.json({
                    message: "UnAuth User",
                    status: false
                })
            }

        }
    } catch (error) {
        res.json({
            message: "UnAuth User",
            status: false
        })
    }
}

module.exports = {
    authMiddleWare
}