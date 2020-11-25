/* eslint valid-jsdoc: "off" */

'use strict';

const onerror = require('../app/handler/error');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1603016730774_9059';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // use for password encryption, should change to your own and keep security
    pwdSalt: 'pwdSalt',
    jwtTokenKey: 'x-wd-token',
    defaultAvatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  };

  // 前后端分离时一般使用CORS校验Origin，此时可以关闭CSRF
  const security = {
    csrf: {
      enable: false,
    },
  };

  // mongodb
  const mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/wonderland',
      options: {
        user: 'wd-admin',
        pass: 'xgp-gog',
      },
    },
  };

  // jwt
  const jwt = {
    enable: true,
    secret: 'jwtSecret',
    match: '/private',
    getToken(ctx) {
      return ctx.cookies.get(userConfig.jwtTokenKey) || null;
    },
  };

  return {
    ...config,
    ...userConfig,
    onerror,
    mongoose,
    security,
    jwt,
  };
};
