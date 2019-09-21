const { model, Schema } = require('mongoose');

const stateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    crimeRate: {
        type: Number,
        required: true,
    },
    marketRate: {
        type: Number,
        required: true,
    },

})