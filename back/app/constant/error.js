'use strict';

module.exports = {
  SYSTEM_ERROR: {
    code: 'WD0000',
    message: '系统繁忙，请稍后再试',
  },
  PARAM_ERROR: {
    code: 'WD0001',
    message: '参数异常',
  },
  UNAUTH_ERROR: {
    code: 'WD0002',
    message: '用户未登录',
  },
  PWD_ERROR: {
    code: 'WD0011',
    message: '密码错误',
  },
  PWD_FORMAT_ERROR: {
    code: 'WD0012',
    message: '密码格式不符合要求',
  },
};
