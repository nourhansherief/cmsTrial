const {Schema , model} = require('mongoose')

const DDMContentSchema = new Schema({} , {timestamps : true})

const DDMContent = model('ddmcontent' , DDMContentSchema)

module.exports = DDMContent