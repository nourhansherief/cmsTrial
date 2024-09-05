const { Schema, model } = require("mongoose");
const { generateUUID } = require("../Utilities/generateUID");

const definitionSchema = new Schema(
  {
    defaultLanguageId: { type: String, required: true },
    fields: { type: Array, required: true },
  },
  { _id: false }
);

const dataDefinitionSchema = new Schema(
  {
    STRUCTUREID: { type: Number },
    USERID: { type: Number },
    USERNAME: { type: String },
    VERSIONUSERID: { type: Number },
    VERSIONUSERNAME: { type: String },
    CREATEDATE: { type: Date },
    MODIFIEDDATE: { type: Date },
    PARENTSTRUCTUREID: { type: Number },
    NAME: { type: String, required: true },
    DEFINITION: {
      type: definitionSchema,
      required: true,
    },
  },
  { timestamps: true }
);

dataDefinitionSchema.pre("save", function (next) {
  if (!this.STRUCTUREID) {
    this.STRUCTUREID = generateUUID();
  }
  next();
});

const DataDefinition = model("ddmstructure", dataDefinitionSchema);

module.exports = DataDefinition;
