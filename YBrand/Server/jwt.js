const jwt = require('jsonwebtoken');

const access_token = jwt.sign({ id: 1 }, 'challenge1-repeat');
console.log(access_token)

const result = jwt.verify(access_token, 'challenge1-repeat')
console.log({ result });