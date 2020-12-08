'use strict';

const BaseController = require('./base');

class ArticleController extends BaseController {
  // 保存草稿
  async saveDraft() {
    // const {
    //   ctx,
    //   config: { jwtTokenKey },
    // } = this;
    // try {
    //   this.success();
    // } catch (error) {
    //   this.error();
    // }
  }

  // 发布
  async publish() {
    const { ctx } = this;
    const { title, cover, html, md } = ctx.request.body;
    const { _id } = ctx.state.user;
    const { _id: articleId } = await ctx.model.Article.create({
      title,
      cover,
      _content: md,
      content: html,
      author: _id,
    });
    this.success({ data: { id: articleId, message: '发布成功' } });
  }

  // 查询详情
  async detail() {
    const {
      app,
      ctx,
      config: {
        jwtTokenKey,
        jwt: { secret: jwtSecret },
      },
    } = this;
    const { id } = ctx.query;
    const info = await ctx.model.Article.findByIdAndUpdate(
      id,
      { $inc: { readTimes: 1 } },
      { useFindAndModify: false }
    ).populate('author', '-createdAt -updatedAt');

    const token = ctx.cookies.get(jwtTokenKey);
    try {
      const { _id } = await app.jwt.verify(token, jwtSecret);
      const user = await ctx.model.User.findById(_id);

      info.author.isFollowed = user.following.includes(info.author._id);
    } catch (error) {
      info.author.isFollowed = false;
    }

    this.success({ data: info });
  }
}

module.exports = ArticleController;
