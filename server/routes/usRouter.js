const router = require("express").Router();
const usCtrl = require("../controllers/usCtrl");

// page
router.route("/landing").get(usCtrl.getLanding);
router.route("/sponsors").get(usCtrl.getSponsors);

// data

module.exports = router;
