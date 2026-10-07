const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
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
      enum: ["client"],
      default: "client"
    },

    phone: {
      type: String,
      default: ""
    },

    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      default: null
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },

    tags: [
  {
    name: {
      type: String,
      required: true
    }
  }
],

    assignedAt: {
      type: Date,
      default: null
    },

    intake: {
  dateOfBirth: {
    type: Date
  },

  gender: {
    type: String,
    default: ""
  },

  presentingConcern: {
    type: String,
    default: ""
  },

  history: {
    type: String,
    default: ""
  }
},

consent: {
  given: {
    type: Boolean,
    default: false
  },

  givenAt: {
    type: Date
  }
},


  },
  {
    timestamps: true
  }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;