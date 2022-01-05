const express = require("express")
const app = express()
const passport = require("../config/passport")
const fs = require("fs")

const users = require("../users.json")

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

app.delete('/logout', (req, res) => {
  req.logout()
  res.status(200).send("ok")
})

app.post('/signup', (req, res) => {
  const { email, username } = req.body
  
  // on cherche un user existant qui a un email
  // ou un username égal a ceux passés dans le body
  let user = users.find(user => (
    user.username === username || user.email === email
  ))

  // si j'en trouve un, c'est qu'il existe deja
  // je peux donc pas le créer
  // je renvoie une erreur qui dit que le user
  // existe deja
  if (user) {
    res.status(409).json({ error: 'User already exists' })
  } else {
    // sinon, s'il existe pas, je le crée
    user = {
      // je récupère toutes les infos du body (email, username, password, age)
      // et je crée un id
      ...req.body,
      id: users.length + 1
    }

    // je lis mon fichier json pour avoir ma liste de user
    fs.readFile('./users.json', (err, data) => {
      if (err) {
        res.send(500).json({ error: "An error occured" })
      } else {
        // je vais décoder le fichier pour récuperer mon tableau de users
        let usersData = JSON.parse(data)
        // je pousse mon nouveau user dans mon tableau
        usersData = [ ...usersData, user ]

        // j'ecris dans mon fichier mon tableau mis a jour avec le nouveau user
        fs.writeFile('./users.json', JSON.stringify(usersData), err => {
          if (err) {
            res.send(500).json({ error: "An error occured" })
          } else {
            res.json(user)
          }
        })
      }
    })
  }
})

module.exports = app
