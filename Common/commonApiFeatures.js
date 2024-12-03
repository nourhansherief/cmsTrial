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
      this.query = this.query.skip(skip).limit(limit);
    } else {
      this.query = this.query.skip(0);
    }
    return this;
  }

  search() {
    if (this.queryString.term && this.queryString.term !== "") {
      const regex = new RegExp(this.queryString.term, "i");
      this.query = this.query.find({ NAME: regex });
    }
    return this;
  }

}

module.exports = APiFeatures;
