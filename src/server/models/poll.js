import mongoose, { Schema } from 'mongoose';

const PollSchema = new Schema({
  title: String,
  _authorId: Schema.Types.ObjectId,
  _options: [{ votes: Array, name: String }],
});

export default mongoose.model('Poll', PollSchema);
