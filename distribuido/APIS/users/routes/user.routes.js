const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt');

const {
    usersGet,
    addUser,
    login
} = require('../controller/user.controller');

const router = Router();

router.get('/', usersGet);
router.post('/add', validateJWT, addUser);
router.post('/login', login);

module.exports = router;