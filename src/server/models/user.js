import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  profileId: String,
  token: String,
});

export default mongoose.model('User', UserSchema);
