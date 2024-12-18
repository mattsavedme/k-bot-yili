const mongoose = require("mongoose");

const EnNameSchema = new mongoose.Schema({
  symbol: {
    type: String,
    index: true,
    unique: true,
    set: (v) => `${v}`.toLowerCase(),
  },
  description: String,
});

const EnNameModel = mongoose.model("EnName", EnNameSchema);

module.exports = { EnNameModel };
