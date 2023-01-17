const { Thought, User } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ createdAt: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
            .then(thoughtData => {
                User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true, runValidators: true }
                )
                console.log(thoughtData);
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },
}
