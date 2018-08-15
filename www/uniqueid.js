var exec = require('cordova/exec'),
    channel = require('cordova/channel');

channel.createSticky('onCordovaUniqueIDReady');
channel.waitForInitialization('onCordovaUniqueIDReady');

function UniqueID() {
    var plugin = this;
    plugin.deviceUID = null;

    channel.onCordovaReady.subscribe(function() {
        plugin.get(function(uid) {
            plugin.deviceUID = uid;
            channel.onCordovaUniqueIDReady.fire();
        }, function() {});
    });
}

UniqueID.prototype.get = function (success, fail) {
    exec(success, fail, 'UniqueDeviceID', 'get', []);
};

module.exports = new UniqueID();
