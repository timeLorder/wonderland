'use strict';

const Core = require('@alicloud/pop-core');
const BaseController = require('./base');

class OSSController extends BaseController {
  constructor(props) {
    super(props);
    const { ossConfig: { accessKeyId, accessKeySecret } = {} } = this.config;
    this.client = new Core({
      accessKeyId,
      accessKeySecret,
      endpoint: 'https://sts.cn-shanghai.aliyuncs.com',
      apiVersion: '2015-04-01',
    });
  }

  // 查询OSS参数
  async getOSSConfig() {
    const {
      ctx,
      config: {
        ossConfig: { bucket, endpoint, roleArn },
      },
    } = this;

    const { _id: userId } = ctx.state.user;

    const params = {
      RegionId: 'cn-shanghai',
      RoleArn: roleArn,
      RoleSessionName: userId,
      DurationSeconds: 900,
    };

    const requestOption = {
      method: 'POST',
    };

    const response = await this.client.request('AssumeRole', params, requestOption);
    const { AccessKeyId, AccessKeySecret, SecurityToken, Expiration } = response.Credentials || {};
    this.success({
      data: {
        bucket,
        endpoint,
        accessKeyId: AccessKeyId,
        accessKeySecret: AccessKeySecret,
        stsToken: SecurityToken,
        expire: Expiration,
      },
    });
  }
}

module.exports = OSSController;
