const {Schema , model} = require('mongoose')

const DDLRecordSchema = new Schema({} , {timestamps : true})

const DDLRecord = model('ddlrecord' , DDLRecordSchema)

module.exports = DDLRecord