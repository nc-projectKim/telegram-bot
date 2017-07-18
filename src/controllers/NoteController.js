const Telegram = require('telegram-node-bot');

class NoteController extends Telegram.TelegramBaseController {
    noteHandler($) {
        const note = $.message.text.split(' ').slice(1).join(' ');

        if (!note) {
            return $.sendMessage('Sorry, please pass a todo item.');
        }

        $.getUserSession('notes')
            .then(notes => {
                if (!Array.isArray(note)) {
                    $.setUserSession(notes, [note]);
                } else {
                    $.setUserSession(notes, note.concat([note]));
                }
                $.sendMessage('Added new note!');
            });
    }

    get routes() {
        return {
            noteCommand: 'noteHandler'
        };
    }
}

module.exports = NoteController;
