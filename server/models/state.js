const { model, Schema } = require('mongoose');

const stateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stateTax: {
        type: Number,
        required: true,
    },
    weather: [Number]
    

})

const State = model('State', stateSchema)
module.exports = { State }