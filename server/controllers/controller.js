const { Truck } = require('../models/truck.models');

module.exports = {
    // C
    createTruck: (req,res) => {
        Truck.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    // R
    allTrucks: (req,res) => {
        Truck.find()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    oneTruck: (req,res) => {
        Truck.findOne({ _id: req.params.id })
            .then(data => {
                if(data == null) {
                    res.status(500).json({ error: "Food truck does not exist." })
                } else {
                    res.json(data)
                }
            })
            .catch(err => res.json(err))
    }, 
    // U
    updateTruck: (req,res) => {
        Truck.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true, useFindAndModify: false })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    addReview: (req,res) => {
        Truck.findOne({ _id: req.params.id, 'reviews.name': req.body.name })
            .then(data => {
                if(data == null){
                    return Truck.findOneAndUpdate({_id: req.params.id}, { $addToSet: { reviews: req.body } }, { new: true, runValidators: true, useFindAndModify: false})
                        
                } else {
                    res.json({ errors:{ reviews: { errors: { name: { message: "That name has already been used on another review for the same truck." } } } } });
                }
            })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    // D
    deleteTruck: (req,res) => {
        Truck.findOneAndDelete({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
}