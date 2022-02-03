const connection = require('../dbConfig')


const triggerCtrl = {
    getTrigger: async (req, res) => {
        console.log("겟트리거")
        const sql = `UPDATE testtb SET count=3 WHERE idtesttb=1`
        
        connection.query(sql,(error,rows) => {
            if(error) throw error;
            res.json("성공")
        })
    }
}

module.exports = triggerCtrl