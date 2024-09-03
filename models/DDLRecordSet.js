const {Schema , model} = require('mongoose')

const DDLRecordSetSchema = new Schema({
    UUID_ : {type : String},
    RECOREDSETID : {type : Number},
    USERNAME : {type : String},
    CREATEDAT : {type : Date},
    MODIFIEDDATE : {type : Date},
    DataDefinition : { type: Schema.Types.ObjectId, ref: 'DataDefinition'},
    NAME : {type : String},
    VERSIONUSERID : {type : Number},
    VERSIONUSERNAME : {type : String},
} , {timestamps : true})

const DDLRecordSet = model('ddlrecordset' , DDLRecordSetSchema)

module.exports = DDLRecordSet