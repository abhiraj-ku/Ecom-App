// base - Product.find()
// base - Product.find(email: {"hitesh@lco.dev"})

//bigQ - //search=coder&page=2&category=shortsleeves&rating[gte]=4
// &price[lte]=999&price[gte]=199&limit=5

// For pager we only need limit and skip
// limit - is how many we want to show on page
// skip - is if we have shown 5 products in first req then skip that and move to next five req

const DOMPurify = require("dompurify");

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

  // Filter function
  filter() {
    const queryOptionsCopy = { ...this.queryOptions };

    delete queryOptionsCopy["search"];
    delete queryOptionsCopy["limit"];
    delete queryOptionsCopy["page"];

    // convert queryOptionsCopy into strings

    const stringQueryoptions = JSON.stringify(queryOptionsCopy);

    // regex on stringQueryoptions to find and filter the url
    stringQueryoptions = stringQueryoptions.replace(
      /\b(gte|lte|gt|lt)\b/g,
      (m) => `$${m}`
    );

    this.collection = this.collection.find(stringQueryoptions);
  }

  // Pagination
  pager(resultPerPage) {
    let currentPage = 1;
    if (this.queryOptions.page) {
      currentPage = this.queryOptions.page;
    }

    const skipVal = resultPerPage * (currentPage - 1);
    this.collection = this.collection.limit(resultPerPage).skip(skipVal);

    return this;
  }
}

// Exporting the class
module.exports = WhereClause;
