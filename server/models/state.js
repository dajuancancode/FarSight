const { model, Schema } = require('mongoose');

const stateSchema = new Schema({
    stateTax: {
        type: Number,
        required: true,
    },
    weather: [
        {temperature: String}
    ]
    

})

const State = model('State', stateSchema)
module.exports(State)