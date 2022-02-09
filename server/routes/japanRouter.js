const japanCtrl = require("../controllers/japanCtrl");
const router = require("express").Router();

// page
router.route("/landing").get(japanCtrl.getLanding);

// data

module.exports = router;
