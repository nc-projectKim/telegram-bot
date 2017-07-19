const Telegram = require('telegram-node-bot');

const noteForm = {
    title: {
        q: 'What title do you want to give your note?',
        error: 'sorry, need text',
        validator: (message, callback) => {
            if (message.text) {
                callback(true, message.text); // you must pass the result also
                return;
            }

            callback(false);
        }
    },
    body: {
        q: 'What do you want to remember?',
        error: 'sorry, wrong input',
        validator: (message, callback) => {
            if (message.text) {
                callback(true, message.text);
                return;
            }

            callback(false);
        }
    }
};

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
