const { response } = require('express');
const jwt = require('jsonwebtoken');



const validateJWT = (req, res=response, next) => {
    let token = req.header('authorization');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        })
    }

    try{
        token = token.replace('Bearer ','');
        const { uid, name} = jwt.verify(token, process.env.AUTH_JWT_SECRET);

        req.uid = uid,
        req.name = name;
    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }

    next();
};

module.exports = {
    validateJWT
}