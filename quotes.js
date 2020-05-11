const got = require('got');

(async () => {
    const client = got.extend({
        baseUrl: 'https://andruxnet-random-famous-quotes.p.mashape.com',
        headers: {
            'X-Mashape-Key': process.env.MashapeKey,
            Accept: 'application/json',
        },
    });

    // quotes 사이트 호출하고 메시지 받기
    const data = await client.get('/?cat=famous&count=1');

    console.log(data);
})();
