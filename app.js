require('dotenv').config({ path: './config.env' })

const Discord = require('discord.js')
const ytdl = require('ytdl-core');

const client = new Discord.Client()

client.login(process.env.TOKEN)

client.once('ready', () => {
    console.log("* Quack")
})

const quack = () => {
    return Math.floor(Math.random() * 10000)
}

client.on('message', async message => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;

    if (message.content === 'quack') {
        return message.reply('quack quack')
    }

    if (message.content === '/join') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            setInterval(() => {
                connection.play(ytdl('https://www.youtube.com/watch?v=Fw3RB7xnb80', { filter: 'audioonly' }));
            }, 120000)
        } else {
            message.reply('quack quack... quack?');
        }
    }
});