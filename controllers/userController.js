const { User } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // getSingleUser(req, res) {

    // }
    createUser({ params, body }, res) {
        console.log(params);
        User.create(body)
            .then(userData => {
                console.log(userData);
                res.json(userData);
            })
            .catch(err => res.json(err));
    },
};