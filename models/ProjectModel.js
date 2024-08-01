const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    budget: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Draft", "Active", "Archived"],
    },
    documentationLink: {
      type: String,
      required: true,
    },
    tasksLink: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
