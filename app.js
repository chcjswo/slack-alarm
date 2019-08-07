require("dotenv").config();
const schedule = require('node-schedule');
const got = require('got');
const util = require('./util');

schedule.scheduleJob('* * * * * *', async () => {
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

    const message = `
                    username: '업무알림',
                    icon_emoji: ':rice:',
                    text: '하루 일과의 시작은 영어 한마디와 함께',
                    attachments:[{
                        color: '#00FFFF',
                        fields: [{
                            title: '알림',
                            value: ${JSON.parse(data.body)[0].quote},
                            short: false
                        }]
                    }]`;

    util.sendSlack(message, (err) => {
        console.log(err);
        if (err) {
            console.error('에러 발생 ===> ', err);
        }
    });
});

schedule.scheduleJob('10 * * * * *', () => {
    console.log('2번 스케쥴');
});