const { Schema, model } = require("mongoose");
const { generateUUID } = require("../Utilities/generateUID");
const convertNumToStr = require("../Utilities/convertNumtoStr");

const DDLRecordSchema = new Schema(
  {
    RECORDID: { type: String },
    RECORDSETID: { type: String },
    DDMSTORAGEID: { type: String },
    USERNAME: { type: String },
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
