/* eslint valid-jsdoc: "off" */

'use strict';

const secrets = require('../secret.json');
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
  config.keys = secrets.cookieKey || appInfo.name + '_1603016730774_9059';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // use for password encryption, should change to your own and keep security
    pwdSalt: secrets.pwdSalt || 'pwdSalt',
    jwtTokenKey: 'x-wd-token',
    ossConfig: {
      bucket: secrets.OSSBucket || 'bucket',
      endpoint: secrets.OSSEndpoint || 'endpoint',
      accessKeyId: secrets.accessKeyId || 'accessKeyId',
      accessKeySecret: secrets.accessKeySecret || 'accessKeySecret',
      roleArn: secrets.roleArn || 'roleArn',
    },
  };

  // 前后端分离时一般使用CORS校验Origin，此时可以关闭CSRF
  const security = {
    csrf: {
      enable: false,
    },
  };

  // mongodb config, should change to your own and keep security
  const mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/wonderland',
      options: {
        user: secrets.dbUser || 'username',
        pass: secrets.dbPass || 'password',
      },
    },
  };

  // jwt
  const jwt = {
    enable: true,
    // use for token encryption, should change to your own and keep security
    secret: secrets.jwtSecret || 'jwtSecret',
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
