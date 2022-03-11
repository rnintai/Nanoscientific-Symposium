const router = require("express").Router();
const zoomCtrl = require("../controllers/zoomCtrl");

router.get("/webinars", zoomCtrl.getWebinars);

module.exports = router;