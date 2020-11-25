'use strict';

module.exports = app => {
  const {
    mongoose,
    config: { defaultAvatar },
  } = app;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(
    {
      username: { type: String, required: true },
      password: { type: String, required: false, select: false },
      avatar: { type: String, required: false, get: v => v || defaultAvatar },
    },
    { timestamps: true }
  );

  return mongoose.model('User', UserSchema);
};
