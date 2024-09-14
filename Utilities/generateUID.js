const {v6: uuidv6} = require('uuid')

function generateUUID() {
  // const chars =
  //   "0123456789";
  // return "xxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
  //   const uid = Math.floor(Math.random() * chars.length);
  //   return Number(chars[uid]);
  // });

  const uuidToNumeric = (uuid) => {
    const hexStr = uuid.replace(/-/g, "")

    const bigInt = BigInt("0x" + hexStr)

    return bigInt.toString()
  }

  const uuid = uuidv6();
  console.log(uuid)
  return uuidToNumeric(uuid)
}

module.exports = { generateUUID };