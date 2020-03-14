const schedule = require('node-schedule');
const got = require('got');
const http = require('http');
const https = require('https');
const cheerio = require('cheerio');
const util = require('./util');

require('dotenv').config();

console.log('업무 알람을 시작 합니다.');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello slack-alarm');
    res.end();
}).listen(process.env.PORT || 3100);

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
    const message = util.makeSlackMessage(
        'watching-you',
        '#00FFFF',
        JSON.parse(data.body)[0].author,
        `${JSON.parse(data.body)[0].quote}\n\n10분 후에는 데일리 스탠드업 미팅을 시작합니다.`
    );

    // 슬랙 메시지 보내기
    util.sendMessage2Slack(message);

    console.log('업무 시작 알림을 보냈습니다.');
});

/**
 * 월-목 퇴근 알림
 */
schedule.scheduleJob('0 18 * * 1-4', () => {
    const message = util.makeSlackMessage(
        'mario_luigi_dance',
        '#C35FB3',
        '퇴근 알림',
        '오늘 하루도 수고 하셨습니다. 안녕히 가세요.\n앗!! 일일 업무보고는 작성 하셨나요?'
    );

    // 슬랙 메시지 보내기
    util.sendMessage2Slack(message);

    console.log('퇴근 알림을 보냈습니다.');
});

/**
 * 불금 퇴근 알림
 */
schedule.scheduleJob('0 18 * * 5', () => {
    const message = util.makeSlackMessage(
        'beer2',
        '#C35FB3',
        '퇴근 알림',
        '완전 신나는 불금 퇴근 시간 입니다.\n술이라도 뽀지게 하세요~\n앗!! 일일 업무보고는 작성 하셨나요?'
    );

    // 슬랙 메시지 보내기
    util.sendMessage2Slack(message);

    console.log('퇴근 알림을 보냈습니다.');
});

/**
 * 주간업무 회의 알림
 */
schedule.scheduleJob('55 10 * * 2', () => {
    const message = util.makeSlackMessage(
        'bullhorn',
        '#6BBC43',
        '회의 알림',
        '5분 후에 주간업무 회의를 시작 합니다.',
    );

    // 슬랙 메시지 보내기
    util.sendMessage2Slack(message);

    console.log('회의 알림을 보냈습니다.');
});

/**
 * TRS 주간업무 회의 알림
 */
// schedule.scheduleJob('55 14 * * 3', () => {
//     const message = util.makeSlackMessage(
//         'bullhorn',
//         '#6BBC43',
//         'TRS 회의 알림',
//         '5분 후에 TRS 주간업무 회의를 시작 합니다.'
//     );

//     // 슬랙 메시지 보내기
//     util.sendMessage2Slack(message);

//     console.log('회의 알림을 보냈습니다.');
// });

/**
 * 점심시간 알림
 */
schedule.scheduleJob('0 12 * * 1-5', () => {
    // const message = util.makeSlackMessage(
    //     'meow_bread',
    //     '#CF2511',
    //     '점심 알림',
    //     '신나는 점심 시간 입니다.\n빨리 엘베 앞으로 고고고~~'
    // );

    // 슬랙 메시지 보내기
    // util.sendMessage2Slack(message);

    console.log('점심 알림을 보냈습니다.');
});

/**
 * 스터디 알림
 */
schedule.scheduleJob('10 18 * * 2', () => {
    // const message = util.makeSlackMessage(
    //     'open_book',
    //     '#007A5A',
    //     '스터디 알림',
    //     '스터디~ 스터디~ 신나는 노래~ 나도 한번 불러 본다~\n곧 스터디 시작입니다 13층으로 고고고~~'
    // );

    // // 슬랙 메시지 보내기
    // util.sendMessage2Slack(message);

    console.log('스터디 알림을 보냈습니다.');
});

/**
 * Heroku sleep 방지용
 */
schedule.scheduleJob('*/10 * * * *', () => {
    https.get('https://slack-alarm.herokuapp.com/');

    console.log('Heroku sleep 방지용 신호를 보냈습니다.');
});

/**
 * 점심 선택 알림
 */
schedule.scheduleJob('10 11 * * 1-5', () => {
    // got.post('https://lunch.mocadev.me/api/v2/slack/choice/');

    console.log('점심선택 알람을 보냈습니다.');
});

/**
 * 코로나 바이러스 알림 알림
 */
schedule.scheduleJob('10 10 * * 1-7', async () => {
    const occurrenceRes = await got('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=', { retries: 5 });
    const cityOccurrenceRes = await got('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=', { retries: 5 });

    let $ = cheerio.load(occurrenceRes.body);

    const title = $('#content > div > p').text();
    const confirmed = $('#content > div > div:nth-child(5) > table > tbody > tr > td:nth-child(1)').text();
    const release = $('#content > div > div:nth-child(5) > table > tbody > tr > td:nth-child(2)').text();
    const death = $('#content > div > div.data_table.mgt16.mini > table > tbody > tr > td:nth-child(3)').text();
    const progress = $('#content > div > div.data_table.mgt16.mini > table > tbody > tr > td:nth-child(7)').text();

    $ = cheerio.load(cityOccurrenceRes.body);
    const pm = $('#content > div > div.data_table.mgt24 > table > tbody > tr.sumline > td:nth-child(2)').text();
    const data = `${title}\n확진환자수: ${confirmed} 명\n전일대비확진환자증감: ${pm} 명\n확진환자 격리해제: ${release} 명\n사망자: ${death} 명\n검사진행: ${progress} 명`;

    const message = util.makeSlackMessage(
        'hospital',
        '0059AB',
        '코로나바이러스 알람',
        data
    );

    // 슬랙 메시지 보내기
    util.sendMessage2Slack(message);

    console.log('코로나바이러스 알림을 보냈습니다.');
});
