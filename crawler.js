const got = require('got');
const cheerio = require('cheerio');

(async () => {
    try {
        const occurrenceRes = await got('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=', { retries: 5 });
        const cityOccurrenceRes = await got('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=', { retries: 5 });

        let $ = cheerio.load(occurrenceRes.body);

        const title = $('#content > div > p:nth-child(5)').text();
        const confirmed = $('#content > div > div:nth-child(7) > table > tbody > tr > td:nth-child(1)').text();
        const release = $('#content > div > div:nth-child(7) > table > tbody > tr > td:nth-child(2)').text();
        const death = $('#content > div > div.data_table.mgt16.mini > table > tbody > tr > td:nth-child(3)').text();
        const progress = $('#content > div > div.data_table.mgt16.mini > table > tbody > tr > td:nth-child(7)').text();

        $ = cheerio.load(cityOccurrenceRes.body);
        const pm = $('#content > div > div.data_table.mgt24 > table > tbody > tr.sumline > td:nth-child(2)').text();
        const data = `${title}\n확진환자수: ${confirmed} 명\n전일대비확진환자증감: ${pm} 명\n확진환자 격리해제: ${release} 명\n사망자: ${death} 명\n검사진행: ${progress} 명`;

        console.log(data);
    } catch (error) {
        console.log(error.response.body);
    }
})();
