const { response } = require('express');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

const createJWT = (data) => {
    const {id, email, password} = data;

    const token = jwt.sign({
        email,
        id
    }, process.env.AUTH_JWT_SECRET)

    return token;
}

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

const encrypt = async (data) => {
    const encrypted = await CryptoJS.AES.encrypt(data, process.env.AES_SECRET).toString();
    return encrypted;
}

const decrypt = async (data) =>{
    let bytes = await CryptoJS.AES.decrypt(data, process.env.AES_SECRET);
    let decryptData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptData
}

module.exports = {
    validateJWT,
    createJWT,
    encrypt,
    decrypt
}