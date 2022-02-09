const router = require("express").Router();
const koreaCtrl = require("../controllers/koreaCtrl");

// page
router.route("/landing").get(koreaCtrl.getLanding);

// data

module.exports = router;
