const got = require('got');

(async () => {
    const client = got.extend({
        baseUrl: 'https://andruxnet-random-famous-quotes.p.rapidapi.com/',
        headers: {
            'x-rapidapi-host': 'andruxnet-random-famous-quotes.p.rapidapi.com',
            'x-rapidapi-key': process.env.rapidapiKey,
            'content-type': 'application/x-www-form-urlencoded',
            useQueryString: true
        },
    });

    // quotes 사이트 호출하고 메시지 받기
    const data = await client.get('/?cat=famous&count=1');

    console.log(data.body);
})();
