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

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createUser({ params, body }, res) {
        console.log(params);
        User.create(body)
            .then(userData => {
                console.log(userData);
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $set: body },
            { new: true, runValidators: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(deletedUser => {
                if (!deletedUser) {
                    res.status(404).json({ message: 'No user with this id!' });
                    return;
                }
                res.json({ message: 'user deleted!', deletedUser });
            })
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(friendData => {
                if (!friendData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(friendData);
            })
            .catch(err => res.json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId  } },
            { new: true }
        )
            .then(userData => {

                if (!userData) {
                    return res.status(404).json({ message: 'No user with this id!' });
                }
                res.json({ message: 'friend deleted!', userData })
            })
            .catch(err => res.json(err));
    }
}