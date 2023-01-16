const { User,Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then()
    }
}