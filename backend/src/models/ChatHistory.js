import mongoose from 'mongoose';

const chatHistorySchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: String,
    citations: [{
      filename: String,
      pageNumber: Number,
      chunk: String,
      confidence: {
        type: String,
        enum: ['High', 'Medium', 'Low']
      },
      evidence: String
    }],
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

export default mongoose.model('ChatHistory', chatHistorySchema);