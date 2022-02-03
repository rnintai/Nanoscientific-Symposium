const router = require('express').Router();
const triggerCtrl = require('../controllers/triggerCtrl')


router.route('/')
    .get(triggerCtrl.getTrigger)

module.exports = router;
