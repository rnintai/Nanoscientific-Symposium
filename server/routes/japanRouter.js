const japanCtrl = require("../controllers/japanCtrl");
const router = require("express").Router();

// page
router.route("/landing").get(japanCtrl.getLanding);
router.route("/exhibit/parksystems").get(japanCtrl.getExhibitParkSystems);
// data

router.route("/sponsors").get(japanCtrl.getSponsors);

module.exports = router;
