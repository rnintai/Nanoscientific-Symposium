const router = require('express').Router();
const asiaCtrl = require('../controllers/asiaCtrl')


router.route('/landing')
  .get(asiaCtrl.getLanding)

router.route('/exhibit/parksystems')
    .get(asiaCtrl.getExhibitParkSystems)

router.route('/exhibit/nanoscientific')
  .get(asiaCtrl.getNanoScientific)

router.route('/programs')
  .get(asiaCtrl.getPrograms)

router.route('/sponsors')
  .get(asiaCtrl.getSponsors)

router.route('/sessions')
  .get(asiaCtrl.getSessions)

module.exports = router;
