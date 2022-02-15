const japanCtrl = require("../controllers/japanCtrl");
const router = require("express").Router();

// page
router.route("/landing").get(japanCtrl.getLanding);
router.route("/exhibit/parksystems").get(japanCtrl.getExhibitParkSystems);
// data
router.route("/programs").get(japanCtrl.getPrograms);

router.route("/sessions").get(japanCtrl.getSessions);

router.route("/speakers").get(japanCtrl.getSpeakers);
router.route("/sponsors").get(japanCtrl.getSponsors);

module.exports = router;
