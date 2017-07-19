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

module.exports = noteForm;
