const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password_hash: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["therapist"],
    default: "therapist"
  },

  slug: {
    type: String,
    unique: true,
    sparse: true
  },

  bio: {
    type: String,
    default: ""
  },

  specializations: {
    type: [String],
    default: []
  },

  languages: {
    type: [String],
    default: []
  }

});

const Therapist =
  mongoose.model(
    "Therapist",
    therapistSchema
  );

module.exports = Therapist;