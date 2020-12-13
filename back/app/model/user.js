'use strict';

module.exports = app => {
  const { mongoose } = app;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(
    {
      __v: { type: Number, select: false },
      username: { type: String, required: true },
      password: { type: String, required: false, select: false },
      avatar: { type: String, required: false },
      following: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        get: arr => arr.map(v => v.toString()),
      },
      follower: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        get: arr => arr.map(v => v.toString()),
      },
    },
    { timestamps: true }
  );

  return mongoose.model('User', UserSchema);
};
