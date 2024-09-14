const {v6: uuidv6} = require('uuid')

function generateUUID() {
  const uuid = uuidv6();
  return uuid
}

module.exports = { generateUUID };