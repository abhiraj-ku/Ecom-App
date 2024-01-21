// base - Product.find()
// base - Product.find(email: {"hitesh@lco.dev"})

//bigQ - //search=coder&page=2&category=shortsleeves&rating[gte]=4
// &price[lte]=999&price[gte]=199&limit=5

class WhereClause {
  constructor(collection, queryOptions) {
    this.collection = collection;
    this.queryOptions = queryOptions;
  }
  // Method to perform a search based on the provided query options
  search() {
    const searchWord = this.queryOptions.search
      ? {
          name: {
            $regex: this.queryOptions.search,
            $options: "i",
          },
        }
      : {};
    this.collection = this.collection.find({ ...searchWord });
    return;
  }
}

// Exporting the class
module.exports = WhereClause;
