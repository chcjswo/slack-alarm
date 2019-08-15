const Slack = require('slack-node');

const env = process.env.NODE_ENV || 'development';

/**
 * 슬랙으로 문자 보내기
 * @param {object} message 슬랙으로 보낼 메시지
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

/**
 * 슬랙 메시지 보내기
 *
 * @param message 메시지
 */
const sendMessage2Slack = (message) => {
    sendSlack(message, (err) => {
        if (err) {
            console.error('에러 발생 ===> ', err);
        }
    });
};

/**
 * 슬랙 메시지 만들기
 *
 * @param emoji emoji
 * @param color color
 * @param title 제목
 * @param value 메시지 내용
 * @returns 슬랙 메시지 내용
 */
const makeSlackMessage = (emoji, color, title, value) => ({
    username: '업무 알람',
    icon_emoji: emoji,
    attachments: [{
        color,
        fields: [{
            title,
            value,
            short: false,
        }],
    }],
});

module.exports = {
    sendMessage2Slack,
    makeSlackMessage
};
