const passport = require("passport")
const passportLocal = require("passport-local")
const fs = require("fs")

const LocalStrategy = passportLocal.Strategy

// const users = require("../users.json")

passport.use(new LocalStrategy((username, password, done) => {
  // console.log(users)
  fs.readFile('./users.json', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const users = JSON.parse(data)
      const user = users.find(user => user.username ===username && user.password === password)
      
      if (!user) {
        return done(null, false)
      } // on met pas de else parce que le return nous fait sortir de la fonction
    
      // ca va mettre req.user = user
      return done(null, user)
    }
  })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  fs.readFile('./users.json', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const users = JSON.parse(data)
      const user = users.find(user => user.id === id)
      done(null, user)
    }
  })
})

module.exports = passport
