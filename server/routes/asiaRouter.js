const router = require('express').Router();
const asiaCtrl = require('../controllers/asiaCtrl')


router.route('/exhibit_hall')
    .get(asiaCtrl.getExhibit)

module.exports = router;
