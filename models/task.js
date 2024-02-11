const mongoose = require('../config/db');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const uniqueValidator = require("mongoose-unique-validator");
const { CUSTOM_PAGINATE_LABELS } = require('../config/constants/common')


mongoosePaginate.paginate.options = { customLabels: CUSTOM_PAGINATE_LABELS };

const Schema = mongoose.Schema;
const schema = new Schema({
    name: { type: String },
    desc: { type: String },
    isActive: { type: Boolean, default: true },
}, { 
    timestamps: {
        createdAt: 'createdAt', updatedAt: 'updatedAt'
    }, toJSON: {
        virtuals: true,
    }
}
);

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
schema.plugin(uniqueValidator);

const task = mongoose.model('task', schema, 'task');
module.exports = task;