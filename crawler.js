const got = require('got');
const cheerio = require('cheerio');

(async () => {
    try {
        const occurrenceRes = await got('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=', { retries: 5 });
        // const cityOccurrenceRes = await got('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=', { retries: 5 });

        let $ = cheerio.load(occurrenceRes.body);
        const title = `코로나바이러스감염증-19 국내 발생현황 ${$('#content > div > h5:nth-child(4) > span').text()}`;
        const sum = $('#content > div > div.caseTable > div:nth-child(1) > ul > li:nth-child(1) > dl > dd').text();
        const confirmed = $('#content > div > div.caseTable > div:nth-child(1) > ul > li:nth-child(2) > dl > dd > ul > li:nth-child(1) > p').text();
        const domestic = $('#content > div > div.caseTable > div:nth-child(1) > ul > li:nth-child(2) > dl > dd > ul > li:nth-child(2) > p').text();
        const overseas = $('#content > div > div.caseTable > div:nth-child(1) > ul > li:nth-child(2) > dl > dd > ul > li:nth-child(3) > p').text();
        const release = $('#content > div > div.caseTable > div:nth-child(2) > ul > li:nth-child(2) > dl > dd > span').text();
        const death = $('#content > div > div.caseTable > div:nth-child(4) > ul > li:nth-child(2) > dl > dd > span').text();
        const progress = $('#content > div > div.caseTable > div:nth-child(3) > ul > li:nth-child(2) > dl > dd > span').text();

        // $ = cheerio.load(cityOccurrenceRes.body);
        // const pm = $('#content > div > div.data_table.mgt24 > table > tbody > tr.sumline > td:nth-child(2)').text();
        const data = `${title}\n`
        + `확진환자 누적: ${sum} 명\n`
        + `확진환자 수: ${confirmed} 명\n`
        + `국내발생: ${domestic} 명\n`
        + `해외발생: ${overseas} 명\n`
            + `격리해제: ${release} 명\n`
            + `격리중: ${progress} 명\n`
            + `사망자: ${death} 명\n`;

        console.log(data);
    } catch (error) {
        console.log(error.response.body);
    }
})();
