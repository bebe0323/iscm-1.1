import mongoose from "mongoose";
const { Schema } = mongoose;

// by default mongoose adds an _id property
const preStartTalkSchema = new Schema({
  workSiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkSite',
    required: true,
  },
  createdBy: { // _id of the person who created it
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobDate: {
    type: Date,
    required: true,
  },
  workerIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  dailyWorkActivities: {
    type: String,
    required: true,
  },
  safety: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // automatically adding two properties: createdAt, updatedAt
});

export const PreStartTalkModel = mongoose.models.PreStartTalk || mongoose.model("PreStartTalk", preStartTalkSchema);
