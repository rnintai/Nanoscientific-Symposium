const adminCtrl = require("../controllers/adminCtrl");
const router = require("express").Router();

// page

router
  .route("/session")
  .post(adminCtrl.addSession)
  .put(adminCtrl.modifySession);

module.exports = router;
