const router = require("express").Router();
const onDemandCtrl = require("../controllers/onDemandCtrl");

router
  .route("/")
  .get(onDemandCtrl.getOnDemandList)
  .post(onDemandCtrl.editOnDemandList)
  .delete(onDemandCtrl.deleteOnDemandList);

router.route("/:id").get(onDemandCtrl.getOnDemandVideo);
router.route("/filter/list").get(onDemandCtrl.getOnDemandAllFilter);
router.route("/page/list").get(onDemandCtrl.getOnDemandPageVideo);
router.route("/application/list")
.get(onDemandCtrl.getOnDemandApplication)
.delete(onDemandCtrl.deleteOnDemandApplication)
.post(onDemandCtrl.editOnDemandApplication)

module.exports = router;
