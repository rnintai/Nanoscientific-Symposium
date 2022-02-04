const router = require('express').Router();
const asiaCtrl = require('../controllers/asiaCtrl')


router.route('/landing')
  .get(asiaCtrl.getLanding)

router.route('/exhibit_hall')
    .get(asiaCtrl.getExhibit)

router.route('/programs')
  .get(asiaCtrl.getPrograms)

router.route('/sessions')
  .get(asiaCtrl.getSessions)

module.exports = router;
