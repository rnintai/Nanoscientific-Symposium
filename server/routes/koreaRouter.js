const router = require("express").Router();
const koreaCtrl = require("../controllers/koreaCtrl");

// page
router.route("/landing").get(koreaCtrl.getLanding);

// data

router.route("/programs").get(koreaCtrl.getPrograms);

router.route("/sessions").get(koreaCtrl.getSessions);

router.route("/speakers").get(koreaCtrl.getSpeakers);

router.route("/sponsors").get(koreaCtrl.getSponsors);

module.exports = router;
