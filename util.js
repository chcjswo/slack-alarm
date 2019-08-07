const Slack = require('slack-node');
const env = process.env.NODE_ENV || 'development';

const sendSlack = (message, cb) => {
    let slackUrl = process.env.MOCADEV_SLACK_URL;

    if (env !== 'development') {
        slackUrl = process.env.DEV2_SLACK_URL;
    }

    console.log(message);
    console.log(slackUrl);

    const slack = new Slack();
    slack.setWebhook(slackUrl);

    let json = {
        channel: 'build',
        username: '점심 뭐 먹지??',
        icon_emoji: ':smile:',
        text: '영어 한마디',
        attachments: [{
            color: '#00FFFF',
            fields: [{
                title: '알림',
                value: '영어 한마디',
                short: false
            }]
        }]
    };

    slack.webhook(json, cb);
};

module.exports = {
    sendSlack
};
