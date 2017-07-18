// // TODO: Add cancel option part way through input

const Telegram = require('telegram-node-bot');
const { token } = require('../config');
const PersistentMemoryStorage = require('./adaptors/PersistentMemoryStorage');
const NoteController = require('./controllers/NoteController');
const OtherwiseController = require('./controllers/OtherwiseController');

const storage = new PersistentMemoryStorage(
  `${__dirname}/data/userStorage.json`,
  `${__dirname}/data/chatStorage.json`
);

// initialise bot
const tg = new Telegram.Telegram(token, {
  workers: 1,
  storage,
});

const noteCtrl = new NoteController();

tg.router.when(new Telegram.TextCommand('/note', 'noteCommand'), noteCtrl)
  .otherwise(new OtherwiseController());

function exitHandler(exitCode) {
  storage.flush();
  process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));
