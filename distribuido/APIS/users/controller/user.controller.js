const {response, request}= require('express');
const { PrismaClient } = require('@prisma/client');
const { createJWT } = require('../middlewares/jwt');

const prisma = new PrismaClient();

const addUser = async (req = request, res = response) => {

    const {username, password, email} = req.body;

    const result = await prisma.Users.create({
        data:{
            username,
            password,
            email
        }
    }).catch((e)=>{
        return e.message;
    }).finally(async () => {
        await prisma.$disconnect();
    });

    res.json(result);
};

const usersGet = (req = request, res = response)=>{
    const { name, email, password }=req.query;

    res.json({
        name,
        email,
        password,
        msg: 'exito'
    })
}

const login = async(req = request, res = response)=>{
    const {username, password} = req.body;
    
    const user = await prisma.Users.findMany({
        where: {           
                    username: username
        },
    }).catch((e)=>{
        return e.message;
    }).finally(async () => {
        await prisma.$disconnect();
    });

    if(user[0]){
        const userJWT = await createJWT(user);

        res.json({
            user,
            userJWT
        });
    }

};

module.exports = {
    usersGet,
    addUser,
    login
}