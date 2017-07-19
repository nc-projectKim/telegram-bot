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

class NoteController extends Telegram.TelegramBaseController {
    noteHandler($) {
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

    getHandler($) {
      $.getUserSession('notes')
        .then(notes => {
          $.sendMessage(this._serializeList(notes), {parse_mode: 'Markdown'});
        });
    }

    viewHandler($) {
      let index = parseInt($.message.text.split(' ').slice(1)[0]);
      if (isNaN(index)) return $.sendMessage('Sorry, you didn\'t pass a valid index.');

      $.getUserSession('notes')
        .then(notes => {
          if (index >= notes.length) return $.sendMessage('Sorry, you didn\'t pass a valid index.');
          $.sendMessage(`*${notes[index].header}*\n\n${notes[index].body}`, {parse_mode: 'Markdown'});
        });
    }

    get routes() {
        return {
            noteCommand: 'noteHandler',
            getCommand: 'getHandler',
            viewCommand: 'viewHandler'
        };
    }

    _serializeList(notesList) {
      let serialized = '*Your Notes:*\n\n';
      notesList.forEach((note, i) => {
        serialized += `*${i}* - *${note.header}*\n\n`;
      });
      return serialized;
    }
}

module.exports = NoteController;
