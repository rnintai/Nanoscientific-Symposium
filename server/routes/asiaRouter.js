const router = require("express").Router();
const asiaCtrl = require("../controllers/asiaCtrl");

// page
router.route("/landing").get(asiaCtrl.getLanding);

router.route("/exhibit/parksystems").get(asiaCtrl.getExhibitParkSystems);

router.route("/exhibit/nanoscientific").get(asiaCtrl.getNanoScientific);

router.route("/sponsors").get(asiaCtrl.getSponsors);

router.route("/sessions").get(asiaCtrl.getSessions);

// data
router.route("/programs").get(asiaCtrl.getPrograms);

router.route("/speakers").get(asiaCtrl.getSpeakers);

module.exports = router;
