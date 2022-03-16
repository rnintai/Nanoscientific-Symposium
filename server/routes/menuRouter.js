const menuCtrl = require("../controllers/menuCtrl");
const router = require("express").Router();

/**
 * @swagger
 *  /api/menu/admin:
 *    put:
 *      tags:
 *      - Menu
 *      description: menu의 isAdmin 값을 조회합니다.
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "id": 1,
 *              "nation": "us",
 *            }
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *          description: nation code
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/admin").post(menuCtrl.getIsAdmin);
/**
 * @swagger
 *  /api/menu/admin:
 *    put:
 *      tags:
 *      - Menu
 *      description: menu의 isAdmin 값을 변경해줍니다..
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "path": "/us/programs",
 *              "nation": "us",
 *              "isAdmin": 1
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/admin").put(menuCtrl.setIsAdmin);

module.exports = router;
