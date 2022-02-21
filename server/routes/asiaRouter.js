const router = require("express").Router();
const asiaCtrl = require("../controllers/asiaCtrl");

// page
router.route("/landing").get(asiaCtrl.getLanding);

router.route("/sponsors").get(asiaCtrl.getSponsors);

// data
router.route("/programs").get(asiaCtrl.getPrograms);

router.route("/sessions").get(asiaCtrl.getSessions);

module.exports = router;
