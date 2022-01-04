const express = require("express")
const app = express()
const passport = require("../config/passport")

app.post('/login', passport.authenticate("local"), (req, res) => {
  if (req.user) {
    req.logIn(req.user, err => {
      if (err) {
        console.log(err)
      } else {
        res.json(req.user)
      }
    })
  }
})

module.exports = app
