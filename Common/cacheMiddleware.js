const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 180, checkperiod: 200 });

const cacheResponses = (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = myCache.get(key);
  if (cachedData) {
    return res.json(cachedData);
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    myCache.set(key, body);
    res.sendResponse(body);
  };

  next();
};

const clearCachedData = (url) => {
  if (url !== "all") {
    myCache.del(url);
  }
  return myCache.flushAll();
};

module.exports = { cacheResponses, clearCachedData };
