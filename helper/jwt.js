const jwt = require('jsonwebtoken')


function generateToken(payload){
  return jwt.sign(payload, 'FOsAnAc4demYY')
}

function verifyToken(token){
  return jwt.verify(token, 'FOsAnAc4demYY')
}

module.exports = {
  generateToken,
  verifyToken
}