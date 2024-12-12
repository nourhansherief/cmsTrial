const { Schema, model } = require("mongoose");
const { generateUUID } = require("../Utilities/generateUID");
const convertNumToStr = require("../Utilities/convertNumtoStr");
const {convertToJson} = require("../Utilities/convertToJson")

const DDMContentSchema = new Schema(
  {
    CONTENTID: { type: String },
    USERNAME: { type: String },
    DATA_: { type: Object },
  },
  { timestamps: true }
);

DDMContentSchema.pre("save", function (next) {
  if (!this.CONTENTID) {
    this.CONTENTID = generateUUID();
  }
  next();
});

const DDMContent = model("ddmcontent", DDMContentSchema);

module.exports = DDMContent;
