const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  donor: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  status: { type: String, default: 'Pending' }, // Pending, Assigned, Completed
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' },
});

module.exports = mongoose.model('Task', TaskSchema);
