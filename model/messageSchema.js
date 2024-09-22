import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    minlength: [2, "Name must contain at least 2 characters! "],
  },
  subject: {
    type: String,
    minlength: [2, "Subject name must contain at least 2 characters! "],
  },
  message: {
    type: String,
    minlength: [2, "Message must contain at least 2 characters! "],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Message = mongoose.model("Message", messageSchema);
