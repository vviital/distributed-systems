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

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  }
});

const questionnaireSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  candidates: [candidateSchema],
});

export const Vote = mongoose.model('Vote', voteSchema);
export const Questionnaires = mongoose.model('Questionnaires', questionnaireSchema);
export const Candidates = mongoose.model('Candidates', candidateSchema);
