// import express
const express = require('express');

// link to users data
const Users = require('./userDb');

// create express router
const router = express.Router();


router.post('/', async (req, res) => {
    console.log(req.body)
  try {
    const newPost = req.body;
    const posted = await Users.insert(newPost)
    res.status(200).json(posted)
   } catch (error) {
        res.status(500).json({
        message: "Error uploading content"
    })
  }
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving users"
        })
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    try {
        const user = await Users.getById(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "User not found"})
        }
    } catch (error) {
        re.status(500).json({ message: "Error retrieving user"})
    }
});

router.get('/:id/posts', validateUserId,  async (req, res) => {
     try {
         const messages = await Users.getUserPosts(req.params.id)
         res.status(200).json(messages)
     } catch (error) {
         res.status(500).json({
             message: "Error getting posts from user"
         })
     }
});

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const count = await Users.remove(req.params.id)
        if (count > 0) {
            res.status(200).json({ message: "The user has been deleted"})
        } else {
            res.status(404).json({ message: "The user could not be found"})
        }
    } catch (error) {
        re.status(500).json({
            message: "Error removing user"
        })
    }
});

router.put('/:id',  validateUserId, async (req, res) => {
    try {
        const user = await Users.update(req.params.id, req.body);
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "The user could not be found"})
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating user"
        })
    }
});

//custom middleware

async function validateUserId(req, res, next) {
    try {
        const id = req.params.id 
        const user = await Users.getById(id)

        if (user) {
            req.user = user;
            next();
        } else {
            res.status(404).json({
                message: "No matching ID"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to process the request"
        })
    }
};

async function validateUser(req, res, next) {
    try {
        const valUser = req.body.name // got name from seeds user. is that right?
        const user = await Users.getById(valUser)
        if (user) {
            req.user = user;
            next()
        } else {
            re.status(404).json({
                message: "No matching user"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to process request"
        })
    }

};

function validatePost(req, res, next) {

};

module.exports = router;
