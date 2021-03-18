cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-jc-googledrive.GoogleDrive",
      "file": "plugins/cordova-plugin-jc-googledrive/www/googleDrive.js",
      "pluginId": "cordova-plugin-jc-googledrive",
      "clobbers": [
        "window.plugins.gdrive"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-android-support-gradle-release": "3.0.1",
    "cordova-plugin-console": "1.0.7",
    "cordova-plugin-jc-googledrive": "1.1.0",
    "cordova-plugin-statusbar": "1.0.1",
    "cordova-plugin-whitelist": "1.2.2"
  };
});