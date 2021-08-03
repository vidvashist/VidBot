const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-2224254749140-2211438740198-U2DxJf5aPXPw0FnVG86W9U7C',
    name: 'vid-bot'
});

//Start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel(
        'general', 
        'Lets Start',
        params
    );
});

//Error Handler
bot.on('error', (err) => console.log(err));

//Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);

});

//respond to data
function handleMessage(message) {
    if(message.includes(' chucknorris')) {
        joke();
    }
    else if(message.includes( ' dadjoke')) {
        dadjoke();
    }
}

//tell a joke

function joke() {
    axios.get("http://api.icndb.com/jokes/random")
        .then(res => {
            const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        };
    
        bot.postMessageToChannel(
            'general', 
            `Chuck Norris: ${joke}`,
            params
        );
    })
}

function dadjoke() {
    axios.get("https://icanhazdadjoke.com/")
        .then(res => {
            const dadjoke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        };
    
        bot.postMessageToChannel(
            'general', 
            `joke: ${dadjoke}`,
            params
        );
    })
}