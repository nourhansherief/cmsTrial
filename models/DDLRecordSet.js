const { Schema, model } = require("mongoose");
const { generateUUID } = require("../Utilities/generateUID");
const convertNumToStr = require("../Utilities/convertNumtoStr");
const validator = require("validator");


const DDLRecordSetSchema = new Schema(
  {
    UUID_: { type: String },
    RECORDSETID: { type: String },
    USERNAME: { type: String },
    CREATEDAT: { type: Date },
    MODIFIEDDATE: { type: Date },
    DDMSTRUCTUREID: { type: String },
    NAME: { type: String,  index: true ,  required: true  },
    VERSIONUSERID: { type: Number },
    VERSIONUSERNAME: { type: String },
  },
  { timestamps: true }
);

DDLRecordSetSchema.pre("save", function (next) {
  if (!this.RECORDSETID) {
    this.RECORDSETID = generateUUID();
  }
  next();
});

const DDLRecordSet = model("ddlrecordset", DDLRecordSetSchema);

module.exports = DDLRecordSet;
