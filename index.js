const TelegramBot = require('node-telegram-bot-api');

const { token } = require('./config.js');

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello to you too');
});

bot.on('message', (msg) => {
  const start = ['hi', 'hello'];
  if (start.indexOf(msg.text.toLowerCase()) !== -1) {
    bot.sendMessage(msg.chat.id, 'Hello dear user');
  }
  const bye = 'bye';
  if (msg.text.toLowerCase().indexOf(bye) === 0) {
    bot.sendMessage(msg.chat.id, 'See you soon!');
  }
});
