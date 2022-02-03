require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));


// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.join(__dirname,'client','build','index.html'))
//     })
// }

app.use('/api/page/asia',require('./routes/asiaRouter'))


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('Sever is running on port ',PORT)
})