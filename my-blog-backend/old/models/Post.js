const coonection = require("../old/db");

class Post {
  constructor() {
    this.posts = [];
    this.init();
  }
  async init() {
    const db = await coonection.getDB();
    this.posts = db.posts;
  }
  async find() {
    return this.posts;
  }
  async findById() {
    return this.posts.find((post) => post.id === id);
  }
  async findByProp(porp) {
    return this.posts.find((post) => post[prop] === porp);
  }
  async search(searchTerm) {
    return this.posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm)
    );
  }
  // Sort =================>
  async sort(posts, sortBy = "asc", sortType = "updatedAt") {
    let result;
    if (sortType === "asc") {
      result = this.#sortAsc(posts, sortBy);
    } else {
      result = this.#sortDec(posts, sortBy);
    }
    return result;
  }

  async #sortAsc(posts, sortBy) {
    return posts.sort((a, b) =>
      a[sortBy].toString().localeCompare(b[sortBy].toString())
    );
  }
  async #sortDec(posts, sortBy) {
    return posts.sort((a, b) =>
      b[sortBy].toString().localeCompare(a[sortBy].toString())
    );
  }
  // Pagination ==========================>
  async pagination(page, limit) {
    const skip = page * limit - limit;
    const totalItems = this.posts.length;
    const totalPage = Math.ceil(totalItems / limit);
    const result = this.posts.slice(skip, skip + limit);
    return {
      result,
      totalItems,
      totalPage,
      hasNext: page < totalPage,
      hasprev: page > 1,
    };
  }
}
module.exports = Post;
