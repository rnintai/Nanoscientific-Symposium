const latamCtrl = require("../controllers/latamCtrl");
const router = require("express").Router();

// page
router.route("/landing").get(latamCtrl.getLanding);

router.route("/sponsors").get(latamCtrl.getSponsors);

// data
router.route("/programs").get(latamCtrl.getPrograms);

router.route("/sessions").get(latamCtrl.getSessions);

router.route("/speakers").get(latamCtrl.getSpeakers);
module.exports = router;
