const mongoose = require("mongoose");

const tag = new mongoose.schema({
  name: { type: String, required: true },
  guild: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: String, required: true }
});

module.exports.tag = mongoose.model("tag", tag);