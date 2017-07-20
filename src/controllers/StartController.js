const Telegram = require('telegram-node-bot');
const noteForm = require('./forms/noteForm');
const expenseForm = require('./forms/expenseForm');

class StartController extends Telegram.TelegramBaseController {

    startHandler($) {
      $.runMenu({
        message: 'Select:',
        options: {
            parse_mode: 'Markdown'
        },
        'Add an expense': () => {
          $.runForm(expenseForm, (result) => {
            const description = result.description;
            const amount = result.amount;
            const chargeTo = result.chargeTo;
            $.getUserSession('expenses')
              .then(expenses => {
                if (!Array.isArray(expenses)) {
                  $.setUserSession('expenses', [{description, amount, chargeTo}]);
                } else {
                  $.setUserSession('expenses', expenses.concat({description, amount, chargeTo}));
                }
                $.sendMessage('Added new expense!');
              });
          });
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

    }

    get routes() {
        return {
            startCommand: 'startHandler',
        };
    }

}

module.exports = StartController;
