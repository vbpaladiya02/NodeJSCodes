const mongoose = require('../config/db');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const { CUSTOM_PAGINATE_LABELS} = require('../../config/constants/common')

mongoosePaginate.paginate.options = { customLabels: CUSTOM_PAGINATE_LABELS };

const Schema = mongoose.Schema;
const schema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String },
    email: { type: String },
    mobNo: { type: String },
    isActive: { type: Boolean, default: true },
    password: { type: String },
    tokens:[
        {
            token: { type: String },
            validateTill: { type: Date }
        }
    ]
}, { 
    timestamps: {
        createdAt: 'createdAt', updatedAt: 'updatedAt'
    }, toJSON: {
        virtuals: true,
    }
}
);


schema.pre('save', async function (next) {
    this.isActive = true;
    if (this.firstName || this.lastName) {
        this.firstName = this.firstName.trim()
        this.lastName = this.lastName.trim()
        this.fullName = `${this.firstName} ${this.lastName ?? ""}`
    }
    next();
});


const user = mongoose.model('user', schema, 'user');
module.exports = user;