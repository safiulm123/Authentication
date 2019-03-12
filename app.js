const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Msg created....',
                authData
            })
        }
    })
})

app.post('/api/login', (req, res) => {
    //user setup 
    const user = {
        id: 1,
        username: 'safiulm',
        email: 'safiulhasan@gmail.com'
    }
    jwt.sign({ user }, 'secretkey', { expiresIn: '30s'},(err, token) => [
        res.json({
            token
        })
    ])
})
//Format of Token 
//Authorization: Hearer  <access_token>
//Verify Token
function verifyToken(req, res, next) {
    console.log(req.headers)
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined 
    console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        console.log('bearerHeader')
        // Split at the space 
        const bearer = bearerHeader.split(' ');
        // Get token from array 
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }

}

app.listen(9000, () => console.log('Server started at port 9000'))
