'use strict';

module.exports = app => {
  const { mongoose } = app;
  const Schema = mongoose.Schema;

  const DraftSchema = new Schema(
    {
      __v: { type: Number, select: false },
      title: { type: String, required: false, default: '无标题' },
      cover: { type: String, required: false },
      _content: { type: String, required: false, default: '', select: false },
      content: { type: String, required: false, default: '' },
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
  );

  return mongoose.model('Draft', DraftSchema);
};
