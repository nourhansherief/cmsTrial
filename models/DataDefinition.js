const { Schema, model } = require("mongoose");
const { generateUUID } = require("../Utilities/generateUID");
const convertNumToStr = require("../Utilities/convertNumtoStr");
const {convertXmlNameToJson} = require('../Utilities/convertXmlNameToJson')
const {convertToJson} = require('../Utilities/convertToJson')


const definitionSchema = new Schema(
  {
    availableLanguageIds : { type : Array , required : false},
    successPage : { type : Object , required : false},
    defaultLanguageId: { type: String, required: true },
    fields: { type: Array, required: true },
  },
  { _id: false }
);

const dataDefinitionSchema = new Schema(
  {
    STRUCTUREID: { type: String },
    USERID: { type: Number },
    USERNAME: { type: String },
    VERSIONUSERID: { type: Number },
    VERSIONUSERNAME: { type: String },
    CREATEDATE: { type: Date },
    MODIFIEDDATE: { type: Date },
    PARENTSTRUCTUREID: { type: Number },
    NAME: { type: String},
    DEFINITION: {
      //type: Schema.Types.Mixed,
      type : definitionSchema,
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

//convertToJson(DataDefinition , 'DEFINITION')

//convertXmlNameToJson(DataDefinition)

//convertNumToStr(DataDefinition , 'STRUCTUREID')

module.exports = DataDefinition;
