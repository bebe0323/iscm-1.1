import mongoose from "mongoose";
const { Schema } = mongoose;

const workSiteSchema = new Schema({
  createdBy: { // _id of the person who created it
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startedAt: { // the date the job started
    type: Date,
    default: null,
  },
  endedAt: { // the date the job ended
    type: Date,
    default: null,
  },
  status: {
    // 0 - not started
    // 1 - in progress
    // 2 - finished
    type: Number,
    default: 0,
    min: 0,
    max: 2,
  },
});

export const WorkSiteModel = mongoose.models.WorkSite ||
                             mongoose.model("WorkSite", workSiteSchema);
