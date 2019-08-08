const Slack = require('slack-node');
const env = process.env.NODE_ENV || 'development';

/**
 * 슬랙으로 문자 보내기
 * @param {string} message 슬랙으로 보낼 메시지
 * @param {function} cb callback function
 */
const sendSlack = (message, cb) => {
    let slackUrl = process.env.MOCADEV_SLACK_URL;

    if (env !== 'development') {
        slackUrl = process.env.DEV2_SLACK_URL;
    }

    const slack = new Slack();
    slack.setWebhook(slackUrl);

    slack.webhook(message, cb);
};

module.exports = {
    sendSlack
};
