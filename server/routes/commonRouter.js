const router = require('express').Router();
const commonCtrl = require('../controllers/commonCtrl')


router.route('/landing')
  .get(commonCtrl.getLanding)


module.exports = router;
