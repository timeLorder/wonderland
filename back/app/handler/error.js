'use strict';

const { SYSTEM_ERROR, UNAUTH_ERROR } = require('../constant/error');

/**
 * 覆盖框架默认统一错误处理
 * 参考 https://eggjs.org/zh-cn/core/error-handling.html
 */
module.exports = {
  html(err, ctx) {
    // html hander
    ctx.body = '<h3>Error</h3>';
    ctx.status = 500;
  },
  json(err, ctx) {
    if (err.name === 'UnauthorizedError') {
      ctx.body = {
        success: false,
        data: {},
        errorCode: UNAUTH_ERROR.code,
        errorMessage: UNAUTH_ERROR.message,
      };
    } else {
      ctx.body = {
        success: false,
        data: {},
        errorCode: SYSTEM_ERROR.code,
        errorMessage: SYSTEM_ERROR.message,
      };
    }

    ctx.status = 200;
  },
};
