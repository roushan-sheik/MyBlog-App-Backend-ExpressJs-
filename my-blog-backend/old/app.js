require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YMLJ = require("yamljs");
const swaggerFile = YMLJ.load("./myblog.yml");

const app = express();

const Post = require("../models/Post");

// const connection = require("./db")

app.use(express.json());
app.use("/api/v1/test", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/health", (_req, res) => {
  res.status(200).json({ health: "good" });
});

app.get("/api/v1/posts", async (req, res) => {
  // 1. extract query params
  let searchTerm = req.query.search || "";
  let sortBy = req.query.sort_by || "createdAt";
  let page = +req.query.page || 1;
  let limit = +req.query.limit || 10;
  let sortType = req.query.sort_type || "asc";
  // console.log("query params", req.query);
  // console.log("default params", { page, limit, sortType, sortBy, search });

  // 1. call post to fetch all post

  const postsInstance = new Post();
  await postsInstance.init();
  let posts;
  // filter based on search term ==================>
  if (searchTerm) {
    posts = await postsInstance.search(searchTerm);
  } else {
    posts = await postsInstance.find();
  }
  // sort based on sortBy term ==================>
  posts = await postsInstance.sort(posts, sortType, sortBy);
  // Pagination ==========================>
  const { result, totalItems, totalPage, hasNext, hasprev } =
    await postsInstance.pagination(posts, page, limit);
  posts = result;

  // Transformed the post ==================>
  posts = posts.map((post) => {
    const transformed = { ...post };
    transformed.author = {
      id: transformed.authorId,
      //TODO: find author name
    };
    transformed.link = `/posts/${transformed.id}`;
    delete transformed.body;
    delete transformed.authorId;
    return transformed;
  });

  const response = {
    data: [posts],
    Pagination: {
      page,
      limit,

      totalPage,
      totalItems,
    },
    links: {
      self: req.url,
    },
  };
  if (hasprev) {
    response.Pagination.prev = page - 1;
    response.links.prev = `/posts?page=${-1}&lomit=${limit}`;
  }
  if (hasNext) {
    response.Pagination.next = page + 1;
    response.links.next = `/posts?page=${+1}&lomit=${limit}`;
  }
  // 1. generate necessary responce

  res.status(200).json(response);
});
app.post("/api/v1/posts", (req, res) => {
  res.status(201).json({ msg: "Hello Post" });
});
app.get("/api/v1/posts/:id", (req, res) => {
  res.status(200).json({ path: `posts Id : ${req.params.id}`, method: "get" });
});
app.put("/api/v1/posts/:id", (req, res) => {
  res.status(200).json({ path: `posts Id : ${req.params.id}`, method: "put" });
});
app.patch("/api/v1/posts/:id", (req, res) => {
  res
    .status(200)
    .json({ path: `posts Id : ${req.params.id}`, method: "patch" });
});
app.delete("/api/v1/posts/:id", (req, res) => {
  res
    .status(200)
    .json({ path: `posts Id : ${req.params.id}`, method: "delete" });
});
app.post("/api/v1/auth/signup", (req, res) => {
  res.status(200).json({ path: "/auth/signup", method: "post" });
});
app.post("/api/v1/auth/signIn", (req, res) => {
  res.status(201).json({ path: "/auth/signIn", method: "post" });
});
app.get("/", (req, res) => {
  res.status(201).json({ Home: "This is Home", method: "get" });
});
app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

let port = process.env.port || 3000;
app.listen(3000, () => {
  console.log(`http://localhost:${port}`);
});
