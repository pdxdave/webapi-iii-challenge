// bring in express
const express = require('express');

// create express server
const server = express();

// middleware
server.use(logger)

// require router
const PostsRouter = require('./posts/postRouter')

server.use('/api/posts', PostsRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request`)
  next();
};

module.exports = server;
