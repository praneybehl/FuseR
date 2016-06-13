/*
 * Json based local storage that stores a user-entered string, and fetches it on the next startup while displaying it to the user.
 * To get started, we need to import the `Storage` module using `require`. Then, you can read a file using `Storage.read`:
 */

var Observable = require("FuseJS/Observable");
var Storage = require("FuseJS/Storage");

var SAVENAME = "localStorage.json";

var welcomeText = Observable("Loading...");
var message = Observable("");
var hasStored = Observable(false);
debug_log("Js initialized");

Storage.read(SAVENAME).then(function(content) {
    var data = JSON.parse(content);
    welcomeText.value = "Stored data: "  + data.message;
}, function(error) {
    // For now, let's expect the error to be because of the file not being found.
    welcomeText.value = "There is currently no local data stored";
});

/*
 * If the read is a success, the first function will be called with the result of the read.
 * In this example, we update the value of a `Text` so it contains our message.
 * However, if something goes wrong, the second function will be called with an error message.
 * To save, we call `Storage.write` with a file name and a string to save.
 * Note that this operation overwrites whatever is already in the file.
 */

function saveMessage() {
    var storeObject = {message: message.value};
    Storage.write(SAVENAME, JSON.stringify(storeObject));
    hasStored.value = true;
}

/*
 * We use JSON because it is a very handy method of serializing data in a way that is quick and easy
 * for us to reach in our JavaScript code, as we can simply parse JSON objects to JavaScript objects.
 * While this example could of stored the message directly to a file,
 * using JSON gives us a lot more flexibility in terms of what we store.
 */

module.exports = {
    welcomeText: welcomeText,
    message: message,
    saveMessage: saveMessage,
    hasStored: hasStored
};
