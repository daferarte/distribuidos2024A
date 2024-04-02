const { Router } = require('express');

const {
    usersGet,
    addUser
} = require('../controller/user.controller');

const router = Router();

router.get('/', usersGet);
router.post('/add', addUser);

module.exports = router;