const client = require('../index')

client.on('ready', () => {
    console.log(`Logged In As ${client.user.tag}`)

    const arrayofStatus = [
        'Noraa Is Made With ❤️ By Abhishek Maurya',
    ];

    let index = 0;
    setInterval(() => {
        if(index === arrayofStatus.length) index = 0;
        const status = arrayofStatus[index];
        client.user.setActivity(status, { type: 'LISTENING'})
        index++;
    }, 5000)
})