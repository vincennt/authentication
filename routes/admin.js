const express = require("express")
const app = express()

const users = require("../users.json")
const { verifyUser } = require("../middlewares/auth")

// je veux proteger cette route
// seulement un user connecté peut avoir 
// acces aux donnees
app.get('/', verifyUser,  (req, res) => {
  res.json(users)  
})

module.exports = app
