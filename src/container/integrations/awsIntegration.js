const AWS = require('aws-sdk');

const env = require('../../env');

class AwsIntegration {
  constructor() {
    AWS.config.update({
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      region: env.AWS_REGION,
    });
    this.instance = AWS;
  }
}

module.exports = AwsIntegration;
