const router = require('express').Router();
const asiaCtrl = require('../controllers/asiaCtrl')


router.route('/landing')
  .get(asiaCtrl.getLanding)

router.route('/exhibit_hall')
    .get(asiaCtrl.getExhibit)

module.exports = router;
