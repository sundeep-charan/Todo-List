var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

var Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
