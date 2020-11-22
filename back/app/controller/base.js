'use strict';

const Controller = require('egg').Controller;
const ERRORS = require('../constant/error');

class BaseController extends Controller {
  async success({ data = {} } = {}) {
    this.ctx.body = {
      success: true,
      data,
    };
  }
  async error({ data = {}, error = ERRORS.SYSTEM_ERROR } = {}) {
    this.ctx.body = {
      success: false,
      data,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
}

module.exports = BaseController;
