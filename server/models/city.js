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
    marketGrowth: {
        type: Number,
        required: true,
    },
    stateTax: {
        type: Number,
        required: true
    },
    costOfLiving: {
        type: Number,
        required: true
    },
    

})