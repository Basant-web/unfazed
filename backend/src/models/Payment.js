const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true
    },

    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session"
    },

    amount: {
      type: Number,
      required: true
    },

    gateway_transaction_id: {
      type: String,
      default: ""
    },

    platform_fee: {
      type: Number,
      default: 0
    },

    net_amount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded"
      ],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);