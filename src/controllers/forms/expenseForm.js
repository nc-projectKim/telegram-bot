const expenseForm = {
    description: {
        q: 'What name would you like to give the item?',
        error: 'sorry, need text',
        validator: (message, callback) => {
            if (message.text) {
                callback(true, message.text); // you must pass the result also
                return;
            }

            callback(false);
        }
    },
    amount: {
        q: 'How much was the item?',
        error: 'sorry, wrong numeric input',
        validator: (message, callback) => {
            if (!isNaN(message.text)) {
                callback(true, message.text);
                return;
            }

            callback(false);
        }
    },
    chargeTo: {
        q: 'Who would you like to charge this to?',
        error: 'sorry, need text',
        validator: (message, callback) => {
            if (message.text) {
                callback(true, message.text);
                return;
            }

            callback(false);
        }
    }
};

module.exports = expenseForm;
