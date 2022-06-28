const superagent = require('superagent')

module.exports = {
    name: 'advice',
    category: 'Fun',
    description: 'Gives A Random Advice',


    run: async(client, message, args) => {
        superagent.get('https://api.adviceslip.com/advice').end((err, res) => {
            if(!err && res.status === 200) {
                try {
                    JSON.parse(res.text)
                } catch {
                    return message.reply(', An Api Error Occurred !')
                }

                const advice = JSON.parse(res.text)
                return message.channel.send(`👉 **${advice.slip.advice}**`)
            } else {
                return console.error(
                    `REST call failed: ${err}, status code: ${res.status}`
                )
            }
        })
    }
}