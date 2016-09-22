var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({  
    LOGGED_IN: null,
    INITIALIZED: null,
    LOGGED_OUT: null,
    GETTING_PICTURE: null,
    RECEIVED_PICTURE: null
  })
};
