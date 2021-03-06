const jwt = require('jsonwebtoken');
const Product = require('../models/product.model');

function verifyToken(req, res, next) {
    let token = req.headers.authorization;
    let validation = false;
    if (!token) {
        return res.status(401).send({
            auth: false,
            token: null,
            message:"missing token, please login"
        })
    }
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                auth: false,
                token: null,
                message:"no authorized"
            })
        }

        Product.findOne({
            _id: req.params.id
          }).then(
            (product) => {
                if(product.user._id == decoded.id){
                    validation = true;
                }
                // Verify admin role
        
                if (decoded.isAdmin == false && validation == false) {
                    return res.status(401).send({
                        auth: false,
                        adminToken: null,
                        message:"permission denied"
                    })
                }else{
                    next();
                }
            }
          ).catch(
            (error) => {
              res.status(404).json({
                error: error
              });
            }
          );

    })
}

module.exports = verifyToken;