const router = require("express").Router();
const onDemandCtrl = require("../controllers/onDemandCtrl");

router
  .route("/")
  .get(onDemandCtrl.getOnDemandList)
  .post(onDemandCtrl.editOnDemandList)
  .delete(onDemandCtrl.deleteOnDemandList);

router.route("/:id").get(onDemandCtrl.getOnDemandVideo);

module.exports = router;
