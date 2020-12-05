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
      _article: md,
      article: html,
      author: _id,
    });
    this.success({ data: { id: articleId, message: '发布成功' } });
  }

  // 查询详情
  async detail() {
    const { ctx } = this;
    const { id } = ctx.query;
    const info = await ctx.model.Article.find({ _id: id })
      .populate('author')
      .update({ $inc: { readTimes: 1 } });
    this.success({ data: info });
  }
}

module.exports = ArticleController;
