const express = require('express'),
 userModel = require('../models/authUser'),
 user = express.Router(),
 writeResponse = require('../helpers/response').writeResponse;

user.post('/auth/google', async function (req, res, next){
    await userModel.authUser(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

user.get('/user', async function (req, res, next){
    await userModel.getUser()
    .then(result => writeResponse(res, result))
    .catch(next);
})

user.delete('/user', async function (req, res, next){
    await userModel.logOut()
    .then(result => writeResponse(res, result))
    .catch(next);
})

module.exports = user;
