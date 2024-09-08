const { Schema, model } = require("mongoose");
const { generateUUID } = require("../Utilities/generateUID");

const DDMContentSchema = new Schema(
  {
    CONTENTID: { type: Number },
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
