const verifyUser = (req, res, next) => {
  if (req.user) { // je check si mon user est bien connecté
    next()
  } else {
    res.status(401).json({ error: "Unauthorized" })
  }
}

module.exports = {
  verifyUser
}
