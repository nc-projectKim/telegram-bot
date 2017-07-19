const Telegram = require('telegram-node-bot');
const noteForm = require('./forms/noteForm');

class StartController extends Telegram.TelegramBaseController {

    startHandler($) {
      $.runMenu({
        message: 'Select:',
        options: {
            parse_mode: 'Markdown'
        },
        'Add a note': () => {
            $.runForm(noteForm, (result) => {
              const header = result.title;
              const body = result.body;
              $.getUserSession('notes')
                .then(notes => {
                  if (!Array.isArray(notes)) {
                      $.setUserSession('notes', [{header, body}]);
                  } else {
                      $.setUserSession('notes', notes.concat({header, body}));
                  }
                  $.sendMessage('Added new note!');
                });
            });
          }
        });
        // 'anyMatch': () => { //will be executed at any other message

        // }
    }

    get routes() {
        return {
            startCommand: 'startHandler',
        };
    }

}

module.exports = StartController;
