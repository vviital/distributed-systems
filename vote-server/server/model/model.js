import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const voteSchema = new Schema({
  ip: {
    type: String,
    required: true,
  },
  voteId: {
    type: String,
    required: true,
  },
  voteIndex: {
    type: String,
    required: true,
  },
  counted: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Number,
  },
  countedDate: {
    type: Number,
  }
});

export const Vote = mongoose.model('Vote', voteSchema);
