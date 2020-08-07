//that is what we tacking from mongoose
const {Schema, model,Types} = require('mongoose')

//From where coming link
const schema = new Schema({
    from: {type: String, required: true},
    //where going our link
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'Link'}

})

//export result of function model - we make here Name of model and scheme with which we work
module.exports = model('Link', schema)