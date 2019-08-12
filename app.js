const schedule = require('node-schedule');
const got = require('got');
const http = require('http');
const util = require('./util');

require('dotenv').config();

console.log('업무 알람을 시작 합니다.');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello slack-alarm');
    res.end();
}).listen(process.env.PORT || 3100);

/**
 * 슬랙 메시지 보내기
 *
 * @param message 메시지
 */
const sendMessage2Slack = (message) => {
    util.sendSlack(message, (err) => {
        if (err) {
            console.error('에러 발생 ===> ', err);
        }
    });
};

/**
 * 출근 알림
 */
schedule.scheduleJob('0 9 * * 1-5', async () => {
    const client = got.extend({
        baseUrl: 'https://andruxnet-random-famous-quotes.p.mashape.com',
        headers: {
            'X-Mashape-Key': process.env.MashapeKey,
            Accept: 'application/json',
        },
    });

    // quotes 사이트 호출하고 메시지 받기
    const data = await client.get('/?cat=famous&count=1');

    const message = {
        username: '업무 알람',
        icon_emoji: ':watching-you:',
        text: '하루 일과의 시작은 영어 한마디와 함께',
        attachments: [{
            color: '#00FFFF',
            fields: [{
                title: `${JSON.parse(data.body)[0].author}`,
                value: `${JSON.parse(data.body)[0].quote}\n\n10분 후에는 데일리 스탠드업 미팅을 시작합니다.`,
                short: false,
            }],
        }],
    };

    // 슬랙 메시지 보내기
    sendMessage2Slack(message);

    console.log('업무 시작 알림을 보냈습니다.');
});

/**
 * 월-목 퇴근 알림
 */
schedule.scheduleJob('0 18 * * 1-4', () => {
    const message = {
        username: '업무 시간 알림',
        icon_emoji: ':mario_luigi_dance:',
        attachments: [{
            color: '#C35FB3',
            fields: [{
                title: '퇴근 알림',
                value: '오늘 하루도 수고 하셨습니다. 안녕히 가세요.\n앗!! 일일 업무보고는 작성 하셨나요?',
                short: false,
            }],
        }],
    };

    // 슬랙 메시지 보내기
    sendMessage2Slack(message);

    console.log('퇴근 알림을 보냈습니다.');
});

/**
 * 불금 퇴근 알림
 */
schedule.scheduleJob('0 18 * * 5', () => {
    const message = {
        username: '업무 알람',
        icon_emoji: ':beer2:',
        attachments: [{
            color: '#C35FB3',
            fields: [{
                title: '퇴근 시간 알림',
                value: '완전 신나는 불금 퇴근 시간 입니다.\n술이라도 뽀지게 하세요~\n앗!! 일일 업무보고는 작성 하셨나요?',
                short: false,
            }],
        }],
    };

    // 슬랙 메시지 보내기
    sendMessage2Slack(message);

    console.log('퇴근 알림을 보냈습니다.');
});

/**
 * 주간업무 회의 알림
 */
schedule.scheduleJob('55 10 * * 2', () => {
    const message = {
        username: '업무 알람',
        icon_emoji: ':bullhorn:',
        attachments: [{
            color: '#6BBC43',
            fields: [{
                title: '회의 알림',
                value: '5분 후에 주간업무 회의를 시작 합니다.',
                short: false,
            }],
        }],
    };

    // 슬랙 메시지 보내기
    sendMessage2Slack(message);

    console.log('회의 알림을 보냈습니다.');
});

/**
 * TRS 주간업무 회의 알림
 */
schedule.scheduleJob('55 14 * * 3', () => {
    const message = {
        username: '업무 알람',
        icon_emoji: ':bullhorn:',
        attachments: [{
            color: '#6BBC43',
            fields: [{
                title: '회의 알림',
                value: '5분 후에 TRS 주간업무 회의를 시작 합니다.',
                short: false,
            }],
        }],
    };

    // 슬랙 메시지 보내기
    sendMessage2Slack(message);

    console.log('회의 알림을 보냈습니다.');
});

/**
 * 점심시간 알림
 */
schedule.scheduleJob('0 12 * * 1-5', () => {
    const message = {
        username: '업무 알람',
        icon_emoji: ':meow_bread:',
        attachments: [{
            color: '#CF2511',
            fields: [{
                title: '점심 알림',
                value: '신나는 점심 시간 입니다.\n빨리 엘베 앞으로 고고고~~',
                short: false,
            }],
        }],
    };

    // 슬랙 메시지 보내기
    sendMessage2Slack(message);

    console.log('점심 알림을 보냈습니다.');
});
