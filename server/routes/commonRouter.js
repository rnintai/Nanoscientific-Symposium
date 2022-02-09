const router = require("express").Router();
const commonCtrl = require("../controllers/commonCtrl");
const asiaCtrl = require("../controllers/asiaCtrl");

router.route("/landing").get(commonCtrl.getLanding);

router.route("/exhibit/parksystems").get(commonCtrl.getExhibitParkSystems);

router.route("/exhibit/nanoscientific").get(commonCtrl.getNanoScientific);

router.route("/maintenance").get(commonCtrl.getMaintenance);

module.exports = router;
