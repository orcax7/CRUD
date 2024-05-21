const express = require('express');
const mysql = require('mysql')
const cors = require('cors')


const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'crud'
})

app.get('/', (re, res)=> {
    return res.json("From Backend side");
})

app.get('/user', (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(3001, () => {
    console.log("listening");
})