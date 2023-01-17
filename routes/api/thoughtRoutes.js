const router = require('express').Router();

const { getAllThoughts, getSingleThought, createThought } = require('../../controllers/thoughtController')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/:thoughtId')
    .get(getSingleThought)
//     .put(updateUser)
//     .delete(deleteUser)

// router
//     .route('/:userId/friends/:friendId')
//     .post(addFriend)
//     .delete(deleteFriend)

module.exports = router;