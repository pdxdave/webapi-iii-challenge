// bring in express
const express = require('express');

// create express router
const router = express.Router();

// link to posts
const Posts = require('./postDb');


router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    }
});

router.get('/:id', (req, res) => {
      try {
          const post = await Posts.findById(req.params.id)
          if (post) {
              res.status(200).json(post)
          } else {
              res.status(404).json({ message: "Post not found"})
          }
      } catch (error) {
          res.status(500).json({
              message: "Error retrieving the post"
          })
      }
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;