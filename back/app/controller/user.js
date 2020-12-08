'use strict';

const md5 = require('md5');
const BaseController = require('./base');
const ERRORS = require('../constant/error');

class UserController extends BaseController {
  // 账密登录/注册
  async onboard() {
    const {
      ctx,
      config: { pwdSalt },
    } = this;
    const { username, password } = ctx.request.body;
    const existantUser = await ctx.model.User.findOne({ username }, [
      '_id',
      'username',
      'password',
      'avatar',
    ]);
    if (existantUser) {
      // 用户名已存在 登录逻辑
      if (existantUser.password === md5(password + pwdSalt)) {
        const { _id, avatar } = existantUser;
        ctx.service.user.signToken({ _id, username, avatar });
        this.success({ data: { message: '登录成功' } });
      } else {
        this.error({ error: ERRORS.PWD_ERROR });
      }
    } else {
      // 用户名不存在 注册逻辑
      // to do 注册前置校验
      const newUser = await ctx.model.User.create({
        username,
        password: md5(password + pwdSalt),
      });
      ctx.service.user.signToken({ _id: newUser._id, username });
      this.success({ data: { message: '注册成功' } });
    }
  }

  // 查询登录态
  async getStatus() {
    const {
      app,
      ctx,
      config: {
        jwtTokenKey,
        jwt: { secret: jwtSecret },
      },
    } = this;
    const token = ctx.cookies.get(jwtTokenKey);

    try {
      const { username, avatar } = await app.jwt.verify(token, jwtSecret);
      // 用户已登录
      // 从Token中获取头像和其他基本信息后返回
      this.success({ data: { isLogin: true, username, avatar } });
    } catch (error) {
      // 令牌校验失败 返回未登录
      this.success({ data: { isLogin: false } });
    }
  }

  // 退出登录态
  async logout() {
    const {
      ctx,
      config: { jwtTokenKey },
    } = this;

    try {
      // to do 撤销token有效性
      ctx.cookies.set(jwtTokenKey, null, { maxAge: 0 });
      this.success();
    } catch (error) {
      this.error();
    }
  }

  // 切换关注
  async switchFollow() {
    const { ctx } = this;
    const { _id: userId } = ctx.state.user;
    const { type, targetId } = ctx.request.body;

    const me = await ctx.model.User.findById(userId);
    const target = await ctx.model.User.findById(targetId);

    if (type === 'FOLLOW') {
      // 关注
      if (!me.following.includes(targetId)) {
        me.following.push(targetId);
        me.save();
      }

      if (!target.follower.includes(userId)) {
        target.follower.push(userId);
        target.save();
      }

      this.success({ data: { message: '关注成功' } });
    }
    if (type === 'UNFOLLOW') {
      // 取关
      let index = me.following.indexOf(targetId);
      if (index > -1) {
        me.following.splice(index, 1);
        me.save();
      }

      index = target.follower.indexOf(userId);
      if (index > -1) {
        target.follower.splice(index, 1);
        target.save();
      }

      this.success({ data: { message: '取消关注成功' } });
    }
  }
}

module.exports = UserController;
