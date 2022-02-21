const router = require("express").Router();
const koreaCtrl = require("../controllers/koreaCtrl");

// page
router.route("/landing").get(koreaCtrl.getLanding);

// data

router.route("/sponsors").get(koreaCtrl.getSponsors);

module.exports = router;
