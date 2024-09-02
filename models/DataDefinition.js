// models/DataDefinition.js
const { Schema, model } = require("mongoose");

const dataDefinitionSchema = new Schema(
  {
    _id: { type: Number },
    STRUCTUREID: { type: Number },
    USERID: { type: Number },
    USERNAME: { type: String },
    VERSIONUSERID: { type: Number },
    VERSIONUSERNAME: { type: String },
    CREATEDATE: { type: Date },
    MODIFIEDDATE: { type: Date },
    PARENTSTRUCTUREID: { type: Number },
    NAME: { type: String },
    DEFINITION: { type: Object },
  },
  { timestamps: true }
);

const DataDefinition = model("ddmstructure", dataDefinitionSchema);

module.exports = DataDefinition;
