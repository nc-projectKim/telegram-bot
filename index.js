const TelegramBot = require('node-telegram-bot-api');

const { token } = require('./config.js');

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hi there! How can I help you?", {
    'reply_markup': {
      'keyboard': [['Add invoice'], ['Add billing item'], ['Query your data']],
      'one_time_keyboard': true
    }
  });
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
