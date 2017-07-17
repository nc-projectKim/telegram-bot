const TelegramBot = require('node-telegram-bot-api');

const { token } = require('./config.js');

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const Hi = 'hi';
  if (msg.text.toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id, 'Hello dear user');
  }
});
