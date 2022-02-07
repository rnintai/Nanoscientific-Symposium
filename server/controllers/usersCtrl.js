const {asiaConnection} = require('../dbConfig');
const hasher = require('wordpress-hash-node');

const usersCtrl = {
  login: async (req, res, next) => {
    const userEmail = req.body.email;
    const userPw = req.body.password;

    const sql = `SELECT email, password FROM user WHERE email='${userEmail}'`;
    asiaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      let dbPassword = rows[0].password; // 해쉬화 된 db상의 wordpress 비밀번호
      let checked = hasher.CheckPassword(userPw, dbPassword);

      
    });

  },
};

module.exports = usersCtrl;
