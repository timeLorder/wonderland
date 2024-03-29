'use strict';

const Service = require('egg').Service;
const ms = require('ms');

class UserService extends Service {
  async signToken(payload, options = {}) {
    const {
      app,
      ctx,
      config: {
        jwtTokenKey,
        jwt: { secret: jwtSecret },
      },
    } = this;
    const token = app.jwt.sign(payload, jwtSecret, {
      expiresIn: '1d',
      ...options,
    });

    ctx.cookies.set(jwtTokenKey, token, { maxAge: ms('10y') });
  }
}

module.exports = UserService;
