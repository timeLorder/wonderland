'use strict';

module.exports = app => {
  const { mongoose } = app;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema(
    {
      __v: { type: Number, select: false },
      title: { type: String, required: false, default: '无标题' },
      cover: { type: String, required: false },
      _content: { type: String, required: true, select: false },
      content: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      readTimes: { type: Number, required: false, default: 0 },
      isPublic: { type: Boolean, required: true },
    },
    { timestamps: true }
  );

  return mongoose.model('Article', ArticleSchema);
};
