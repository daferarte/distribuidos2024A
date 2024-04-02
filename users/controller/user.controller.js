const {response, request}= require('express');
const { PrismaClient } = require('@prisma/client');

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

module.exports = {
    usersGet,
    addUser
}