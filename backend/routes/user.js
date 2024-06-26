const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
require('dotenv').config();




router.post('/signup', (req, res) => {
    const user = req.body;
    query = "select email,password,role,status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user(name, contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
                connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully Registered" })
                    } else {
                        return res.status(500).json(err);

                    }
                })
            } else {
                return res.status(400).json({ message: "Email Already Exist." })
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    consoleFun()
    const user = req.body;
    console.log(process.env.ACCESS_TOKEN)
    query = "select email,password,role,status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect username / password" })
            } else if (results[0].status === 'false') {
                return res.status(401).json({ message: 'Wait for admin approval' })
            } else if (results[0].password === user.password) {
                const response = { email: results[0].email, role: results[0].role };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken })
            } else {
                return res.status(400).json({ message: "Something went wrong.Please try again later." });
            }
        } else {
            return res.status(500).json(err);

        }
    })

})

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

router.post('/forgetPassword', (req, res) => {
    const user = req.body;
    query = 'select email,password from user where email=""';
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            console.log(results)

            if (results.length <= 0) {
                return res.status(200).json({ message: "Password sent successfully to your email" })
            } else {
                let mailOption = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: "Password by Cafe Mangement System",
                    html: `<p><b>Your login details for cafe management System</b><br>
                        Email:<b>${results[0].email}<br></b><b>Password:</b>${results[0].password}<bt> 
                        <a href="http://localhost:4200/" Click here to login></a></p>`
                };
                transport.sendMail(mailOption, function (err, info) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Email sent" + info.response)
                    }
                });
                return res.status(200).json({ message: "Password sent successfully to your email" })
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;