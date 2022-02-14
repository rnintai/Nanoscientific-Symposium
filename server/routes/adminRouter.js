const adminCtrl = require("../controllers/adminCtrl");
const router = require("express").Router();

// page

router
  .route("/session")
  .post(adminCtrl.addSession)
  .put(adminCtrl.modifySession);

router
  .route("/program")
  .post(adminCtrl.addProgram)
  .put(adminCtrl.modifyProgram);
module.exports = router;
