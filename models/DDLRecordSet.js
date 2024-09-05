const { Schema, model } = require("mongoose");
const { generateUUID } = require("../Utilities/generateUID");

const DDLRecordSetSchema = new Schema(
  {
    UUID_: { type: String },
    RECORDSETID: { type: Number },
    USERNAME: { type: String },
    CREATEDAT: { type: Date },
    MODIFIEDDATE: { type: Date },
    DDMSTRUCTUREID: { type: Number },
    NAME: { type: String, required: true },
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
