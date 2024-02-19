const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const signToken = (user) => {
    const { id } = user
    return jwt.sign({ id }, JWT_SECRET)
}


const verifyToken = (token) => {
    console.log({token, JWT_SECRET}, "<< token, jwt")
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    signToken,
    verifyToken
}