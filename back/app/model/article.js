'use strict';

module.exports = app => {
  const { mongoose } = app;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema(
    {
      title: { type: String, required: false, default: '无标题' },
      cover: { type: String, required: false },
      _article: { type: String, required: true, select: false },
      article: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      readTimes: { type: Number, required: false, default: 0 },
      isDraft: { type: Boolean, required: false, default: false },
    },
    { timestamps: true }
  );

  return mongoose.model('Article', ArticleSchema);
};
