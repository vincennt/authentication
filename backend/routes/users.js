const express = require("express")
const app = express()
const fs = require("fs")
const moment = require("moment")
const multer = require("multer")

const upload = multer({ dest: 'public' })

app.post('/:id', upload.single('profilePicture'), (req, res) => {
  console.log(req.file)
  const { id } = req.params

  const {
    path,
    destination,
    originalname
  } = req.file

  // création de variable pour renommer notre fichier
  const date = moment().format('DD-MM-YYYY-hh-mm-ss')
  const fileName = `${date}-${originalname}`

  // on renomme notre fichier uploadé par multer
  // avec un nouveau nom contenant la data et
  // le nom original du fichier
  fs.renameSync(path, `${destination}/${fileName}`)

  // on va lire le fichier users.json pour modifier 
  // la profilePicture du bon user
  fs.readFile('./users.json', (err, data) => {
    if (err) {
      res.status(500).json({ json: 'An error occured' })
    } else {
      // je décode le contenu de mon fichier pour qu'il soit
      // manipulable
      const users = JSON.parse(data)
      
      // on va trouver l'index de l'utilisateur qu'on veut modifier
      // const user = users.find(user => user.id === Number(id))
      const index = users.findIndex(user => user.id === Number(id))
      users[index].profilePicture = `http://localhost:5000/${fileName}`

      fs.writeFile('./users.json', JSON.stringify(users), (err) => {
        if (err) {
          res.status(500).json({ json: 'An error occured' })
        } else {
          res.json({ success: "File uploaded" })
        }
      })
    }
  })
})

module.exports = app
