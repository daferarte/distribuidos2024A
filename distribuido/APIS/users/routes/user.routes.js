const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt');

const {
    usersGet,
    addUser
} = require('../controller/user.controller');

const router = Router();

router.get('/', usersGet);
router.post('/add', validateJWT, addUser);

module.exports = router;