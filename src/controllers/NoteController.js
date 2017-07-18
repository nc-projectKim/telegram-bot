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
        // const note = $.message.text.split(' ').slice(1).join(' ');

        // if (!note) {
        //     return $.sendMessage('Sorry, please pass note text.');
        // }

        // $.getUserSession('notes')
        //   .then(notes => {
        //         if (!Array.isArray(notes)) {
        //             $.setUserSession('notes', [note]);
        //         } else {
        //             $.setUserSession('notes', notes.concat([note]));
        //         }
        //         $.sendMessage('Added new note!');
        //       });

        // {"USER_371755327_notes":
        //   ["Test note 1",
        //   "Test note 2",
        //   "New note with lots of text that goes on for ages. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
        // ]}

        $.runForm(noteForm, (result) => {
          const header = result.title;
          const body = result.body;
          $.getUserSession('notes')
            .then(notes => {
              if (!Array.isArray(notes)) {
                  $.setUserSession('notes', [{header, body}]);
              } else {
                  $.setUserSession('notes', notes.concat([{header, body}]));
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

    get routes() {
        return {
            noteCommand: 'noteHandler',
            getCommand: 'getHandler'
        };
    }

    _serializeList(notesList) {
      let serialized = '*Your Notes:*\n\n';
      notesList.forEach((note, i) => {
        serialized += `*${i}* - *${note.header}*\n\n ${note.body}\n\n`;
      });
      return serialized;
    }
}

module.exports = NoteController;
