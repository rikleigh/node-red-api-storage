// require dependencies
var util = require('util'),
  when = require('when'),
  request = require('request');


var apiUrls = {
  getFlows: process.env.GET_FLOWS_ENDPOINT,
  saveFlows: process.env.SAVE_FLOWS_ENDPOINT,
  getSettings: process.env.GET_SETTINGS_ENDPOINT,
  getCredentials: process.env.GET_CREDENTIALS_ENDPOINT,
  saveCredentials: process.env.SAVE_CREDENTIALS_ENDPOINT
}

// Private variables and functions
var settings;
var debug = true;

var saveJSON = function(endpoint, json) {
  var requestParams = {
    json: true,
    method: 'POST',
    body: json,
    uri: endpoint
  };

  return when.promise(function(resolve, reject) {
    request(requestParams, function(error, response, body) {
      if (error) {
        log.info(error);
        reject();
      }

      resolve();

    });
  });
}

var fetchJSON = function(endpoint, fallback, returnJsonKey) {
  var requestParams = {
    json: true,
    method: 'GET',
    uri: endpoint
  };

  if (fallback === undefined) {
    fallback = {};
  }

  return when.promise(function(resolve, reject) {
    request(requestParams, function(error, response, json) {
      if (error) {
        log.info(error);
        return reject();
      }

      if (!json || Object.keys(json).length === 0 && json.constructor === Object) {
        return resolve(fallback);
      }

      if(returnJsonKey){
        return resolve(json[returnJsonKey])
      }
      return resolve(json);

    });
  });
}



var log = {
  info: function (message) {
    if (debug) {
      console.info(message);
    }
  }
}

// Public functions
var apiStorage = {
  init: function(_settings) {
    settings = _settings;
    log.info("initialized with settings:");
    log.info(util.inspect(settings));
    log.info('api storage endpoints:');
    log.info(util.inspect(apiUrls));

    return when.promise(function(resolve,reject) {
      resolve();
    });
  },

  getFlows: function() {
    log.info("getFlows called");
    return fetchJSON(apiUrls.getFlows, [], 'flows');
  },

  saveFlows: function(flows) {
    log.info("saveFlows called with:");
    log.info(flows);
    return saveJSON(apiUrls.saveFlows, { flows: flows });
  },

  getCredentials: function() {
    log.info("getCredentials called");
    return fetchJSON(apiUrls.getCredentials);
  },

  saveCredentials: function(credentials) {
    log.info("saveCredentials called with:");
    log.info(credentials);
    return saveJSON(apiUrls.saveCredentials, credentials);
  },

  getSettings: function() {
    log.info("getSettings called");
    return fetchJSON(apiUrls.getSettings);
  },

  saveSettings: function(newSettings) {
    log.info("saveSettings called with:");
    log.info(util.inspect(newSettings));
    return saveJSON(apiUrls.saveSettings, newSettings);
  },

  getSessions: function() {
    log.info("getSessions called");
    return when.promise(function(resolve,reject) {
      resolve({});
    });
  },

  saveSessions: function(sessions) {
    log.info("saveSessions called with:");
    log.info(util.inspect(sessions));
    return when.promise(function(resolve,reject) {
      resolve();
    });
  },

  getLibraryEntry: function(type, path) {
    log.info("getLibraryEntry called with:");
    log.info("type: " + type);
    log.info("path: " + path);
    return when.promise(function(resolve,reject) {
      resolve([]);
    });
  },

  saveLibraryEntry: function(type, path, meta, body) {
    log.info("saveLibraryEntry called with:");
    log.info("type: " + type);
    log.info("path: " + path);
    log.info("meta: " + util.inspect(meta));
    log.info("body: " + body);

    return when.promise(function(resolve,reject) {
      resolve();
    });
  }
}

module.exports = apiStorage;
