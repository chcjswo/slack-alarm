const schedule = require('node-schedule');
const got = require('got');
const util = require('./util');

require("dotenv").config();

/**
 * 출근 알림
 */
schedule.scheduleJob('0 9 * * 1-5', async () => {
    console.log('1번 스케쥴');
    const client = got.extend({
        baseUrl: 'https://andruxnet-random-famous-quotes.p.mashape.com',
        headers: {
            'X-Mashape-Key': process.env.MashapeKey,
            'Accept': 'application/json'
        }
    });

    const data = await client.get('/?cat=famous&count=1');

    // console.log(JSON.parse(data.body)[0].quote);
    // console.log(JSON.parse(data.body)[0].author);
    

    const message = {
        username: '업무알림',
        icon_emoji: ':smile:',
        text: '하루 일과의 시작은 영어 한마디와 함께',
        attachments: [{
            color: '#00FFFF',
            fields: [{
                title: `${JSON.parse(data.body)[0].author}`,
                value: `${JSON.parse(data.body)[0].quote}`,
                short: false
            }]
        }]
    };

    util.sendSlack(message, (err) => {
        console.log(err);
        if (err) {
            console.error('에러 발생 ===> ', err);
        }
    });
});

/**
 * 퇴근 알림
 */
schedule.scheduleJob('0 18 * * 1-5', () => {
    const message = {
        channel: 'build',
        username: '업무 알림',
        icon_emoji: ':perfect:',
        text: '#기술연구소 #개발2팀 업무 알림',
        attachments: [{
            color: '#C35FB3',
            fields: [{
                title: '퇴근 알림',
                value: '오늘 하루도 수고 하셨습니다. 안녕히 가세요.\n앗!! 일일 업무보고는 작성 하셨나요?',
                short: false
            }]
        }]
    };
    
    util.sendSlack(message, (err) => {
        console.log(err);
        if (err) {
            console.error('에러 발생 ===> ', err);
        }
    });
});