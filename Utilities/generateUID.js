function generateUUID() {
  const chars =
    "0123456789";
  return "xxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const uid = Math.floor(Math.random() * chars.length);
    return Number(chars[uid]);
  });
}

module.exports = { generateUUID };
