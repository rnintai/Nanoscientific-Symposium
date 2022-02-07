const router = require('express').Router();
// const usersCtrl = require('../controllers/usersCtrl');
const usersCtrlPool = require('../controllers/usersCtrlPool');

// router.post('/login', usersCtrl.login);
router.post('/login', usersCtrlPool.login);

module.exports = router;