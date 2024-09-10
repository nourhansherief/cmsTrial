class APiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  pagination() {
    if (this.queryString.page) {
      let page = this.queryString.page * 1;
      let minimumLimit = this.queryString?.limit * 1 || 10;
      let limit = minimumLimit > 50 ? 50 : minimumLimit;
      let skip = (page - 1) * limit;
      return (this.query = this.query.skip(skip).limit(limit));
    } else {
      return (this.query = this.query.skip(0));
    }
  }
}

module.exports = APiFeatures;
