'use strict';

const md5 = require('md5');
const ms = require('ms');
const BaseController = require('./base');
const ERRORS = require('../constant/error');

class UserController extends BaseController {
  // 账密登录/注册
  async onboard() {
    const {
      app,
      ctx,
      config: {
        pwdSalt,
        jwtTokenKey,
        jwt: { secret: jwtSecret },
      },
    } = this;
    const { username, password } = ctx.request.body;
    const existantUser = await ctx.model.User.findOne({ username });
    if (existantUser) {
      // 用户名已存在 登录逻辑
      if (existantUser.password === md5(password + pwdSalt)) {
        const { _id } = existantUser;
        const token = app.jwt.sign(
          {
            _id,
          },
          jwtSecret,
          {
            expiresIn: '1d',
          }
        );

        ctx.cookies.set(jwtTokenKey, token, { maxAge: ms('10y') });
        this.success({ data: { message: '登录成功' } });
      } else {
        this.error({ error: ERRORS.PWD_ERROR });
      }
    } else {
      // 用户名不存在 注册逻辑
      // to do 注册前置校验
      await ctx.model.User.create({
        username,
        password: md5(password + pwdSalt),
      });
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
        defaultAvatar,
        jwt: { secret: jwtSecret },
      },
    } = this;
    const token = ctx.cookies.get(jwtTokenKey);

    try {
      const user = await app.jwt.verify(token, jwtSecret);
      // 用户已登录
      // 查询头像或其他基本信息后返回
      const { username, avatar = defaultAvatar } = await ctx.model.User.findById(user._id);
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
      ctx.cookies.set(jwtTokenKey, null, { maxAge: 0 });
      this.success();
    } catch (error) {
      this.error();
    }
  }
}

module.exports = UserController;
