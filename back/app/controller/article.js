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
    const { title, cover, html, md, isPublic } = ctx.request.body;
    const { _id } = ctx.state.user;
    const { _id: articleId } = await ctx.model.Article.create({
      title,
      cover,
      _content: md,
      content: html,
      author: _id,
      isPublic,
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
    const {
      _id: articleId,
      author,
      title,
      content,
      cover,
      isPublic,
      readTimes,
      updatedAt,
    } = await ctx.model.Article.findByIdAndUpdate(
      id,
      { $inc: { readTimes: 1 } },
      { useFindAndModify: false }
    ).populate('author', '_id username avatar');

    const token = ctx.cookies.get(jwtTokenKey);
    const { _id: authorId, username, avatar } = author;
    let hasFollowed;
    try {
      const { _id } = await app.jwt.verify(token, jwtSecret);
      const user = await ctx.model.User.findById(_id);

      hasFollowed = user.following.includes(authorId);
    } catch (error) {
      hasFollowed = false;
    }

    this.success({
      data: {
        articleId,
        title,
        content,
        cover,
        isPublic,
        readTimes,
        updatedAt,
        author: { authorId, username, avatar, hasFollowed },
      },
    });
  }

  // 查询热点文章列表
  async getHotList() {
    const { ctx } = this;
    let { current = 1, pageSize = 10, landTime } = ctx.query;

    current = parseInt(current);
    pageSize = parseInt(pageSize);
    landTime = parseInt(landTime);

    const oneWeekAgo = landTime - 7 * 24 * 3600 * 1000;
    const list = await ctx.model.Article.find({
      isPublic: true,
      updatedAt: { $gt: oneWeekAgo },
    })
      .populate('author', '_id username avatar')
      .sort('-readTimes')
      .skip((current - 1) * pageSize)
      .limit(pageSize);

    this.success({ data: { list } });
  }
}

module.exports = ArticleController;
