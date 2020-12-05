'use strict';

module.exports = app => {
  const { mongoose } = app;
  const Schema = mongoose.Schema;

  const DraftSchema = new Schema(
    {
      title: { type: String, required: false, default: '无标题' },
      cover: { type: String, required: false },
      _article: { type: String, required: false, default: '', select: false },
      article: { type: String, required: false, default: '' },
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
  );

  return mongoose.model('Draft', DraftSchema);
};
