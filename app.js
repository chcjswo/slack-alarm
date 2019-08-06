const schedule = require('node-schedule');

schedule.scheduleJob('* * * * * *', () => {
    console.log('1번 스케쥴');
});

schedule.scheduleJob('10 * * * * *', () => {
    console.log('2번 스케쥴');
});