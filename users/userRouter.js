// import express
const express = require('express');

// link to users data
const Users = require('./userDb');

// create express router
const router = express.Router();


router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

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

// async function validateUser(req, res, next) {
//     try {
//         const valUser = req.params.name // got name from seeds user. is that right?
//         const user = await Users.getById(valUser)
//     }

// };

function validatePost(req, res, next) {

};

module.exports = router;
