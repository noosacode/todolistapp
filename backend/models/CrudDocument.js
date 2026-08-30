const mongoose = require("mongoose");

const crudDocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,
  },
  {
    timestamps: true,
    collection: "cruddocuments",
  }
);

module.exports = mongoose.model("CrudDocument", crudDocumentSchema);