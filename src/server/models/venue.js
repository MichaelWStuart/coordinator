import mongoose from 'mongoose';

const VenueSchema = new mongoose.Schema({
  yelpId: String,
  attendees: Array,
});

export default mongoose.model('Venue', VenueSchema);
