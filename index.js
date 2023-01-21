const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
var cookieParser = require('cookie-parser')

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'mydb.cu6unrorcuye.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '1234jack',
  database: 'anny_name',
//   port: ' 3308'
})
connection.connect()

const corsOption = {
    origin:'http://localhost:5173',
    credentials: true
};
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))


app.get('/anny', (req, res) => {
    // var sql = 'SELECT id, username FROM user'

})
// app.post('/user', (req, res) => {
//         var username = req.body.username
//         var email = req.body.email
//         var password = req.body.password
//         var params = [username, email, password]
//         var sql = "INSERT INTO user (username, email, password) VALUES (?,?,?)"
//         connection.query(sql, params,(err, rows, fields) => {
//             if (err) throw err
    
//             //console.log('The solution is: ', rows)
//             res.send('sucess')
//         })
// })
app.get('/getuser/:userid', (req, res)=>{
    var sql = "SELECT * FROM user WHERE id = ? "
    connection.query(sql,[req.params.userid],(err, rows, fields) => {
        if (err) throw err
            res.send(rows)
})
})
app.post('/login', (req, res) => {
   
    var email = req.body.email
    var password = req.body.password
    var params = [ email, password]
    var sql = "SELECT id FROM user WHERE email = ? and password = ?"
    connection.query(sql, params,(err, rows, fields) => {
        if (err) {
            throw err
        }else{
            if(rows.length> 0){
                res.cookie("login", rows[0].id)
                let data ={
                    status: 200,
                    message: 'success'
                }
                res.send(data)
            }else{
                res.send('fail')
            }
        }
    })
})
app.post('/isLoggedIn', (req, res) => {
    // res.send('log in ')
    // console.log(req.cookies)
    if(req.cookies.login){
        let data = {
            status: 200,
            message: "Logged In"
        }
        res.send(data)
    }else{
        res.send('no cookies')
    }
})

            
        

        //console.log('The solution is: ', rows)
        // res.send('sucess')
    

app.put('/update', (req, res) => {
    var username = req.body. username
    var firstname = req.body. firstname
    var lastname = req. body. lastname
    var email = req.body. email
    var id = req.body.id
    var password = req.body. password
    var params = [username, firstname, lastname, email, password,id ]
    var sql = "UPDATE user SET username = (?) ,firstname = (?), lastname=(?), email = (?), password = (?) WHERE id = ? "
    connection.query(sql,params, (err, rows, fields) => {
        if (err) throw err
        res.send('up')
    })
})
app.delete('/deleteuser', (req, res) => {
    var sql = "DELETE FROM user WHERE id = 5"
    connection.query(sql, [], (err, row,fields) => {
        if (err) throw err
        res.send('delete success')
    })
})
app.listen(port)