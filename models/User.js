//that is what we tacking from mongoose
const {Schema, model,Types} = require('mongoose')

//making object schema from constructor of class Schema
const schema = new Schema({
// it's Available to user
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
links: [{type: Types.ObjectId, ref: 'Link'}]
})

//export result of function model - we make here Name of model and scheme with which we work 
module.exports = model('User', schema)