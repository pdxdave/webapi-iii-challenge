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

router.get('/:id', validatePostId, async (req, res) => {
      try {
          const post = await Posts.getById(req.params.id)
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

router.delete('/:id', validatePostId,  async (req, res) => {
     try {
         const count = await Posts.remove(req.params.id)
         if (count > 0) {
             res.status(200).json({ message: "The post has been deleted."})
         } else {
             res.status(404).json({ message: "The post could not be found"})
         }
     } catch (error) {
         res.status(500).json({ 
             message: "Error removing the post"
         });
     }
});


router.put('/:id', validatePostId, async (req, res) => {
    console.log(req.body)
    try {
        const post = await Posts.update(req.params.id, req.body);
        res.status(200).json(post)
    }catch (error) {
        res.status(500).json({
            message: "Error updating the post"
        })
    }
})


        
// custom middleware

async function validatePostId(req, res, next) {
    try {
        const id = req.params.id
        const post = await Posts.getById(id)
         
        if (post) {
            req.post = post;
            next();
        } else {
            res.status(404).json({
                message: "No matching ID"
            })
        }
     } catch (error) {
         res.status(500).json ({
             message: "Failed to process request"
         })
     }
};

module.exports = router;