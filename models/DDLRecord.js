const { Schema, model } = require("mongoose");
const { generateUUID } = require("../Utilities/generateUID");

const DDLRecordSchema = new Schema(
  {
    RECORDID: { type: Number },
    RECORDSETID: { type: Number },
    USERNAME: { type: String },
    DDMSTORAGEID: { type: Number },
  },
  { timestamps: true }
);

DDLRecordSchema.pre("save", function (next) {
  if (!this.RECORDID) {
    this.RECORDID = generateUUID();
  }
  next();
});

const DDLRecord = model("ddlrecord", DDLRecordSchema);

module.exports = DDLRecord;
