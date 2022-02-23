const adminCtrl = require("../controllers/adminCtrl");
const router = require("express").Router();

// page

/**
 * @swagger
 *  /api/admin/session:
 *    post:
 *      tags:
 *      - Admin
 *      description: 세션을 추가해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "title": "session title",
 *              "date": "2022-02-02"
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

/**
 * @swagger
 *  /api/admin/session:
 *    put:
 *      tags:
 *      - Admin
 *      description: 세션을 수정해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "title": "session title",
 *              "date": "2022-02-02",
 *              "id":25,
 *              "status":1
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router
  .route("/session")
  .post(adminCtrl.addSession)
  .put(adminCtrl.modifySession);

/**
 * @swagger
 *  /api/admin/program:
 *    post:
 *      tags:
 *      - Admin
 *      description: 프로그램을 추가해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "session": 2,
 *              "title":"session-title",
 *              "speakers":"kim min tai",
 *              "description":"this section is desc",
 *              "startTime":"2022-02-21 11:44:00",
 *              "endTime":"2022-02-21 11:44:00",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

/**
 * @swagger
 *  /api/admin/program:
 *    put:
 *      tags:
 *      - Admin
 *      description: 프로그램을 수정해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "title": "session title",
 *              "date": "2022-02-02",
 *              "id":25,
 *              "status":1
 *              "speakers":"kim min tai",
 *              "description":"this section is desc",
 *              "startTime":"2022-02-21 11:44:00",
 *              "endTime":"2022-02-21 11:44:00"
 *             }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router
  .route("/program")
  .post(adminCtrl.addProgram)
  .put(adminCtrl.modifyProgram);

router
  .route("/speaker")
  .post(adminCtrl.addSpeaker)
  .put(adminCtrl.modifySpeaker);

router.route("/hideProgram").get(adminCtrl.getHideProgram);
router.route("/hideSession").get(adminCtrl.getHideSession);

router.route("/showProgram").put(adminCtrl.showProgram);
router.route("/showSession").put(adminCtrl.showSession);

router.route("/hideSpeaker").get(adminCtrl.getHideSpeaker);
router.route("/showSpeaker").put(adminCtrl.showSpeaker);

router.route("/users").get(adminCtrl.getUsers);

module.exports = router;
