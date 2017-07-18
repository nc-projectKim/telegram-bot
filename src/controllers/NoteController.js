const Telegram = require('telegram-node-bot');

class NoteController extends Telegram.TelegramBaseController {
    noteHandler($) {
        const note = $.message.text.split(' ').slice(1).join(' ');

        if (!note) {
            return $.sendMessage('Sorry, please pass note text.');
        }

        $.getUserSession('notes')
          .then(notes => {
                if (!Array.isArray(notes)) {
                    $.setUserSession('notes', [note]);
                } else {
                    $.setUserSession('notes', notes.concat([note]));
                }
                $.sendMessage('Added new note!');
              });
    }

    getHandler($) {
      $.getUserSession('notes')
        .then(notes => {
          $.sendMessage(this._serializeList(notes), {parse_mode: 'Markdown'});
        });
    }

    get routes() {
        return {
            noteCommand: 'noteHandler',
            getCommand: 'getHandler'
        };
    }

    _serializeList(notesList) {
      let serialized = '*Your Notes:*\n\n';
      notesList.forEach((note, i) => {
        serialized += `*${i}* - ${note}\n`;
      });
      return serialized;
    }
}

module.exports = NoteController;
