const router = require('express').Router();
const usersCtrl = require('../controllers/usersCtrl');

router.post('/login', usersCtrl.login);

module.exports = router;