const router = require("express").Router();
const commonCtrl = require("../controllers/commonCtrl");
const asiaCtrl = require("../controllers/asiaCtrl");

 
// 
router.route("/eventLanding").get(commonCtrl.getEventLanding);

router.route("/exhibit/parksystems").get(commonCtrl.getExhibitParkSystems);

router.route("/exhibit/nanoscientific").get(commonCtrl.getNanoScientific);

router.route("/maintenance").get(commonCtrl.getMaintenance);

router.route("/programs").get(commonCtrl.getPrograms);
router.route("/sessions").get(commonCtrl.getSessions);
router.route("/speakers").get(commonCtrl.getSpeakers);
router.route("/landing").get(commonCtrl.getLanding);
router.route("/sponsors").get(commonCtrl.getSponsors);

module.exports = router;
 