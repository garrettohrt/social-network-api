const router = require('express').Router();

const { getAllUsers, createUser, getSingleUser, updateUser, deleteUser } = require('../../controllers/userController')

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;